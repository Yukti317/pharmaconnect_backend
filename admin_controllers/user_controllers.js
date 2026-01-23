// const db = require('../db')
import { db } from '../db.js'
import bcrypt from 'bcryptjs'
import { ObjectId } from "mongodb";
const collections = await db();

export const addUser = async (req, res) => {
    const { email, name, phone, password, role, status } = req.body

    try {
        const checkUser = await collections.user.findOne({ email })
        const adduser = await collections.user
        if (checkUser)
            return res.status(400).json({
                success: false,
                message: "User is already exist",
            });

        const haspassword = await bcrypt.hash(password, 12);
        const newUser = await adduser.insertOne({
            name, phone, email, role, status,
            password: haspassword,
        });

        res.status(200).json({
            message: "User Scussfully Added!!!",
            success: true

        })
    } catch (error) {
        console.log("error", error)
    }
}

export const updateUser = async (req, res) => {
    const { id, email, name, phone, role, status } = req.body
    try {
        const adduser = await collections.user
        
        const result = await adduser.findOne({ _id: new ObjectId(id) })
       
        if (result.length === 0)
            return res.status(400).json({
                success: false,
                message: "User is not exist",
            });

        const edituser = adduser.updateOne({ _id: new ObjectId(id) }, { $set: { name, phone, email, role, status, id } })
        res.status(200).json({
            message: "User Updated!!!",
        })
    } catch (error) {
        console.log("error", error)
    }
}

export const getAllusers = async (req, res) => {
    try {
        // const [users] = await db.query("SELECT id, name,phone,  UPPER(role) AS role, email, status FROM users")
        const rawUsers = await collections.user.find({}).toArray()
        const users = rawUsers.map((u, i) => ({
            id: i + 1,
            _id: u._id.toString(),  // MUI needs this
            name: u.name,
            email: u.email,
            phone: u.phone,
            role: u.role,
            status: u.status,
            created_at: u.created_at,
        }));
        res.status(200).json({
            message: "Get Users Scussfully!!!",
            users
        })
    } catch (error) {
        console.log("errr", error)
    }

}

export const getUserbyid = async (req, res) => {
    const { _id } = req.params
    console.log("_id", req.params)
    try {
        const result = await collections.user.findOne({ _id: new ObjectId(_id) })
        console.log('first', result)
        res.status(200).json({
            message: "Get Users details Scussfully!!!",
            result
        })
    } catch (error) {
        console.log("errorr", error)
    }
}

export const deletebyid = async (req, res) => {
    const { _id } = req.params
    const user = collections.user
    try {
        const result = await user.deleteOne({ _id: new ObjectId(_id) })

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted Scussfully!!!",
            status: true
        })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message
        });
    }
}

// module.exports = { addUser, getAllusers, getUserbyid, updateUser }