const pool = require('../config/db')
const { v4: uuidv4 } = require('uuid');

const createTenancyRecord = async (record) => {
    const id = uuidv4();
      const { tenant_id, house_id, move_in_date, number_of_occupants, minimum_stay_months, agreement_done,
        agreement_expiry_date, painting_charges, notes, agreement_file_url } = record;
     const dataWithId = {id,...record}
 
        
     const enteredValues =  Object.entries(dataWithId).filter(([k ,v ])=> v !== undefined);
     const values = enteredValues.map(([key,value])=>value);
     const placeholders = enteredValues.map(()=> '?').join(', ');
     const columnNames = enteredValues.map(([key,value])=>key).join(', ');
   
     
    const [[houseOccupied]] = await pool.execute(`SELECT id FROM tenancy_records where house_id = ? AND move_out_date IS NULL`, [house_id]);
    if (houseOccupied) {
        return "House is already occupied by someone"
    }
    const [[tenantAlreadyLivingElsewhere]] = await pool.execute(`SELECT id FROM tenancy_records where tenant_id = ? AND move_out_date IS NULL`, [tenant_id]);

    const result = await pool.execute(`INSERT INTO tenancy_records (${columnNames} ) VALUES (${placeholders})`,values)
   
  return { result, warning: tenantAlreadyLivingElsewhere ? "Tenant is also staying in another house" : null };

}

const getAllTenancyRecords = async()=>{
      const [results] =  await pool.execute(`SELECT * FROM tenancy_records`);
      
      return results;
}

const getAllActiveTenancyRecords = async ()=>{
       const [results] = await pool.execute(`SELECT * FROM tenancy_records WHERE move_out_date is NULL`)
       console.log(results)
       return results;
}
const getTenancyRecordById = async (id) =>{
       const [[result]] =   await pool.execute((`SELECT * FROM tenancy_records WHERE id = ? `), [id]);
       if(!result){
        return "Invalid Request"
       }
       return result;

}

module.exports = {createTenancyRecord, getAllTenancyRecords, getAllActiveTenancyRecords, getTenancyRecordById}