// const db = require('../db')
// const bycrpt = require('bcryptjs')
// const jwttoken = require('jsonwebtoken')
// const User = require('../models/user_Model')
import {db} from '../db.js'
import bycrpt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const collections = await db();
        const checkUser = await collections.user.findOne({ email })
        // const [result] = await db.query('SELECT * FROM users WHERE email = ? ', [email])
        console.log("checkUser", checkUser)
        if (!checkUser) return res.status(400).json({ message: "User not fount" })
        const user = checkUser

        const isMatch = await bycrpt.compare(password, user.password)
        console.log("isMatch", isMatch)
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" })

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.log("errorr", error)
    }
}

