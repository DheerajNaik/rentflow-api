
const buildingModel = require('../models/building.model')

const createBuilding = async (req, res) => {
    try {
        
        const { name, address, city, yearly_tax, cauvery_water_account_number, cauvery_water_bill_image } = req.body
        const building = await buildingModel.createBuilding({ name, address, city, yearly_tax, cauvery_water_account_number, cauvery_water_bill_image })
        res.status(201).json({ success: true, data: building })

    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
module.exports = { createBuilding }