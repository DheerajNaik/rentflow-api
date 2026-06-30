const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant.controller');
const {validateTenant,validateUpdateTenant} = require('../middleware/tenantValidator');



router.post('/',validateTenant, tenantController.createTenant);
router.get('/',tenantController.getAllTenants);
router.get('/:id',tenantController.getTenantById);
router.put('/:id',validateUpdateTenant,tenantController.updateTenantById);
router.delete('/:id',tenantController.deleteTenantById);
router.put('/:id/restore', tenantController.restoreTenantById)
module.exports = router









