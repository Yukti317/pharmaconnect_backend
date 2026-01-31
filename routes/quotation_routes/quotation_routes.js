import express from 'express'
import auth from '../../middleware/auth.js'
import { allowRoles } from '../../middleware/roles.js'
import { Addquotation, GetAllQuotation } from '../../admin_controllers/quotation_controllers.js'

const router = express.Router()
router.post('/dashboard/Addquotation', auth, allowRoles('admin', 'manager', 'bde'), Addquotation)
router.get('/dashboard/Getallquotation', auth, allowRoles('admin', 'manager', 'bde'),GetAllQuotation)

export default router;