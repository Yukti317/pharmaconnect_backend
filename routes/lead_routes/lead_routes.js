import express from 'express'
import { allowRoles } from '../../middleware/roles.js';
import { addLead, Deletelead, GetAllLeads, getLeadsById, updateLead } from '../../admin_controllers/lead_controllers.js';
import auth from '../../middleware/auth.js';

const router = express.Router()

router.post('/dashboard/Addlead', auth, allowRoles('admin', 'bde', 'manager'), addLead)
router.get('/dashboard/getAllleads',auth,allowRoles('admin', 'bde', 'manager'),GetAllLeads)
router.get('/dashboard/getLeadsbyId/:_id',auth,allowRoles('admin', 'bde', 'manager'),getLeadsById),
router.put('/dashboard/updateLead',auth,allowRoles('admin', 'bde', 'manager'),updateLead),
router.delete('/dashboard/deleteLead/:_id', auth,allowRoles('admin', 'bde', 'manager'),Deletelead )

export default router;