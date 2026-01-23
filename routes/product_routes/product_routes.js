import express from 'express'
import auth from '../../middleware/auth.js'
import { addProduct, deleteproductbyid, getAllProducts, getProdustById, UpdateProduct } from '../../admin_controllers/product_controllers.js'
import { allowRoles } from '../../middleware/roles.js'


const router = express.Router()
router.post('/dashboard/Addproduct', auth, allowRoles('admin', 'manager', 'bde'), addProduct)
router.get('/dashboard/getAllproducts', auth, allowRoles('admin', 'manager', 'bde'), getAllProducts)
router.get('/dashboard/getproductsById/:_id', allowRoles('admin', 'manager', 'bde'), getProdustById)
router.put('/dashboard/updateProduct',auth, allowRoles('admin', 'manager', 'bde'), UpdateProduct)
router.delete('/dashboard/deleteProduct/:_id', auth, allowRoles('admin', 'manager', 'bde'), deleteproductbyid)
export default router;