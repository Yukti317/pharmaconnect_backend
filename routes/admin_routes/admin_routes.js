import express from 'express'
import auth from '../../middleware/auth.js'
import { allowRoles } from '../../middleware/roles.js'
import { dashboardstats } from '../../admin_controllers/admin_controllers.js'


const router = express.Router()
router.get('/dashboard/stat', auth, allowRoles('admin','manager','bde'), dashboardstats)


// module.exports = router
export default router;