const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant.controller');
const {validateTenant} = require('../middleware/tenantValidator');


router.post('/',validateTenant, tenantController.createTenant);
router.get('/',tenantController.getAllTenants);
router.get('/:id',tenantController.getTenantById);

module.exports = router









