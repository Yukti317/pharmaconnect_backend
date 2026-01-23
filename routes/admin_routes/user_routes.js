import express from 'express'
import auth from '../../middleware/auth.js'
import {  allowRoles } from '../../middleware/roles.js'
import { addUser, deletebyid, getAllusers, getUserbyid, updateUser } from '../../admin_controllers/user_controllers.js'

const router = express.Router()
router.post('/dashboard/Adduser', auth, allowRoles('admin','manager'), addUser)
router.get('/dashboard/getUsers',auth, allowRoles('admin','manager'), getAllusers)
router.get('/dashboard/getUsersByID/:_id',auth, allowRoles('admin','manager'), getUserbyid)
router.put('/dashboard/UpdateUser',auth, allowRoles('admin','manager'), updateUser)
router.delete('/dashboard/deleteUser/:_id',auth,allowRoles('admin','manager'),deletebyid)


export default router;