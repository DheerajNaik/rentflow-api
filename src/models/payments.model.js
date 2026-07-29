const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createPaymentDetails = async (data) => {
  const id = uuidv4();
  const dataWithId = { id, ...data };
  const columnNames = Object.keys(dataWithId).join(", ")
  const placeholders = Object.keys(dataWithId).map(() => `?`).join(", ")
  const values = Object.values(dataWithId)
  const [result] = await pool.execute(`INSERT INTO payments (${columnNames} ) VALUES (${placeholders})`, values);
  return result;
}

const updatePaymentDetails = async (id, data) => {

  const setClause = Object.keys(data).map((item) => `${item} = ?`).join(", ")
  const values = Object.values(data)
  values.push(id);
  const [result] = await pool.execute(`UPDATE payments SET ${setClause}, updated_at = NOW() WHERE id = ?`, values)
  return result;
}

const getAllPayments = async () => {
  const [result] = await pool.execute(`SELECT t.name AS tenant_name,b.name AS building_name,p.id,houses.house_name AS house_name, p.amount_paid,p.payment_date,p.payment_for_month
                        FROM payments p
                        JOIN tenancy_records ON p.tenancy_record_id = tenancy_records.id
                        JOIN tenants t ON tenancy_records.tenant_id= t.id
                        JOIN houses ON tenancy_records.house_id = houses.id
                        JOIN buildings b ON houses.building_id = b.id ORDER BY b.name`)
  return result;
}

const getAllUnpaidPayments = async () => {
  const [result] = await pool.execute(`SELECT tr.move_in_date, t.name as tenant_name, b.name As building_name, h.house_name AS house_name, MAX(p.payment_for_year * 12 + p.payment_for_month) as last_paid_month
                        FROM tenancy_records tr 
                        JOIN tenants t ON tr.tenant_id = t.id
                        JOIN houses h ON tr.house_id = h.id
                        JOIN buildings b  ON h.building_id = b.id
                        LEFT JOIN payments p ON p.tenancy_record_id = tr.id 
                        WHERE tr.move_out_date IS NULL
                        GROUP BY tr.id,t.name, b.name, h.house_name, tr.move_in_date`);

  const current = new Date();
  // console.log(result)
  //console.log(current)
  const currentMonth = current.getMonth() + 1;
  const currentYear = current.getFullYear();
  const currentDate = current.getDate();
  const currentYearAndMonth = currentYear * 12 + currentMonth
  // console.log(currentYearAndMonth)



  const updatedList = result.map(tenant => {
    const dateStr = tenant.move_in_date;

    const dateObj = new Date(dateStr);

    const year = dateObj.getFullYear(); // Returns 2026
    const month = dateObj.getMonth() + 1; // Returns 1 (January)

    const dueMonths = [];
    // Handle last_paid_month === null when tenant has never paid rent
    if (tenant.last_paid_month === null) {

      let monthvar = month - 1;

      let monthTenantEntered = year * 12 + month - 1;


      tenant.last_paid_month = monthTenantEntered

    }




    if (tenant.last_paid_month < currentYearAndMonth - 1) {
      // last paid jan . current is mar;
      // due is feb 
      // i = feb;


      for (let i = tenant.last_paid_month + 1; i < currentYearAndMonth; i++) {

        let getMonth = i % 12;

        let getYear = Math.floor(i / 12);

        if (getMonth === 0) {
          getMonth = 12; // Handle December edge case
          getYear = year
        }

        if (i === currentYearAndMonth - 1 && currentDate > 15) {
          dueMonths.push({
            month: getMonth, year: getYear, status: "Overdue"
          })
        }

        else if (i === currentYearAndMonth - 1 && currentDate <= 15) {
          dueMonths.push({
            month: getMonth, year: getYear, status: "grace"
          })
        }

        else {
          dueMonths.push({
            month: getMonth, year: getYear, status: "Overdue"
          })
        }
      }
    }


    return {
      ...tenant, dueMonths
    }
  })

  return updatedList;
}

const deletePayment = async (id) => {
  const [result] = await pool.execute(`DELETE FROM payments WHERE id = ?`, [id]);
  return result;
}
const getPaymentsByTenancyId = async (id) => {
  const [result] = await pool.execute(`SELECT * FROM payments WHERE id = ?`, [id]);
  return result;
}
module.exports = { createPaymentDetails, updatePaymentDetails, getAllPayments, getAllUnpaidPayments, deletePayment, getPaymentsByTenancyId }