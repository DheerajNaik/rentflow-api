const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createPaymentDetails = async(data)=>{
    const id = uuidv4();
    const dataWithId = {id,...data};
    const columnNames = Object.keys(dataWithId).join(", ")
    const placeholders = Object.keys(dataWithId).map(()=>`?`).join(", ")
    const values = Object.values(dataWithId)
    const [result] = await pool.execute(`INSERT INTO payments (${columnNames} ) VALUES (${placeholders})`, values);
    return result;
}

const updatePaymentDetails = async(id,data)=>{
    const columnNames = Object.keys(data).join(", ")
    const setClause = Object.keys(data).map((item)=>`${item} = ?`).join(", ")
    const values = Object.values(data)
    values.push(id);
    const [result] = await pool.execute(`UPDATE payments SET ${setClause}, updated_at = NOW() WHERE id = ?`,values) 
    return result;    
}

const getAllPayments = async () => {
  const [result] =  await pool.execute(`SELECT b.name,p.id,houses.house_name, p.amount_paid,p.payment_date,p.payment_for_month
                        FROM payments p
                        JOIN tenancy_records ON p.tenancy_record_id = tenancy_records.id
                        JOIN houses ON tenancy_records.house_id = houses.id
                        JOIN buildings b ON houses.building_id = b.id ORDER BY b.name`)
        return result;   
}

const getAllUnpaidPayments = async ()=>{
       const [result] = await pool.execute(`SELECT tr.move_in_date, t.name, b.name, h.house_name, MAX(p.payment_for_year * 12 + p.payment_for_month) as last_paid_month
                        FROM tenancy_records tr 
                        JOIN tenants t ON tr.tenant_id = t.id
                        JOIN houses h ON tr.house_id = h.id
                        JOIN buildings b  ON h.building_id = b.id
                        LEFT JOIN payments p ON p.tenancy_record_id = tr.id 
                        WHERE tr.move_out_date IS NULL
                        GROUP BY tr.id,t.name, b.name, h.house_name, tr.move_in_date`);
                 
const current = new Date();
const currentMonth = current.getMonth()+1;
const currentYear = current.getFullYear();
const currentDate = current.getDate();
const currentYearAndMonth = currentYear * 12 + currentMonth

const updatedList = result.map(tenant=>{
  const dueMonths = [];
       if(tenant.lastpaidmonth ===null) {
            const dateStr = tenant.move_in_date;
            const dateObj = new Date(dateStr);
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth(); 
            tenant.lastpaidmonth = year *12 + month;
       }
        let getMonth = tenant.lastpaidmonth % 12;
        if (getMonth === 0) getMonth = 12; // Handle December edge case
        const getYear = Math.floor(tenant.lastpaidmonth / 12);
      
       if(tenant.lastpaidmonth === currentYearAndMonth -1 && currentDate <=15){
         dueMonths.push( {
           month : getMonth, year : getYear , status : "grace"
            })
      }

      else if(tenant.lastpaidmonth === currentYearAndMonth -1 && currentDate>15){
        dueMonths.push ({
          month : getMonth, year : getYear , status : "Overdue"
         }) 
      }
      else if(tenant.lastpaidmonth < currentYearAndMonth -1 ){
           for(let i= tenant.lastpaidmonth+1; i <= currentYearAndMonth; i ++){
             let getMonth = i % 12;
        if (getMonth === 0) getMonth = 12; // Handle December edge case
        const getYear = Math.floor(i / 12);
               if(i === currentYearAndMonth -1 && currentDate>15){
                dueMonths.push ({
                    month : getMonth, year : getYear , status : "Overdue"
                 }) 
               }
               else if (i === currentYearAndMonth -1 && currentDate <=15){
                 dueMonths.push( {
                   month : getMonth, year : getYear , status : "grace"
                  })
               }
               else {
                    dueMonths.push ({
                    month : getMonth, year : getYear , status : "Overdue"
                 })
               }
           }        
      }
      return {
        ...tenant, dueMonths
      }
}
)
return updatedList ;
                          
}

const deletePayment = async (id)=>{
         const [result] = await pool.execute(`DELETE FROM payments WHERE id = ?`,[id]);
        
         return result;
}
const getPaymentsByTenancyId = async(id)=>{
  
        const [result] = await pool.execute(`SELECT * FROM payments WHERE id = ?`,[id]);
        return result;

}
module.exports = {createPaymentDetails, updatePaymentDetails, getAllPayments, getAllUnpaidPayments,deletePayment,getPaymentsByTenancyId}