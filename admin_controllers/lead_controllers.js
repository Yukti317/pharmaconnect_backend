import { db } from '../db.js'
import bcrypt from 'bcryptjs'
import { ObjectId } from "mongodb";
const collections = await db();

function formatDateOnly(dateValue) {
    console.log("dateValue", dateValue)
    const date = new Date(dateValue);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export const addLead = async (req, res) => {
    const { name, country, email, phone, product_interest, status, next_followup, remark, contactpersonname } = req.body

    try {
        if (!name || !country || !email || !phone || !product_interest || !status || !next_followup || !contactpersonname) {
            res.status(400).json({
                message: "Please add all requried fields"
            })
        }
        const mongoDate = new Date(next_followup);
        const addLead = await collections.leads
        const newLead = await addLead.insertOne({ name, country, email, phone, product_interest, status, mongoDate, remark, contactpersonname })
        console.log("newLead", newLead)
        res.status(200).json({
            status: true,
            message: "Lead is added scussfully!!!"
        })
    } catch (error) {
        console.log("error", error)
    }
}

export const updateLead = async (req, res) => {
    const { id, name, country, email, phone, product_interest, status, next_followup, remark, contactpersonname } = req.body
    try {

        const updatelead = await collections.leads
        const result = updatelead.find({ _id: new ObjectId(id) })
        if (result.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Lead is not exist",
            });
        }
        const mongoDate = new Date(next_followup);
        const editlead = updatelead.updateOne({ _id: new ObjectId(id) }, { $set: { name, country, email, phone, product_interest, status, mongoDate, remark, contactpersonname } })
        res.status(200).json({
            message: "Lead is updated scussfully!!!",
            status: true
        })
    } catch (error) {
        console.log("error", error)
    }
}
export const GetAllLeads = async (req, res) => {
    try {
        const rawlead = await collections.leads.find({}).toArray()
        const leads = rawlead.map((u, i) => ({
            id: i + 1,
            _id: u._id.toString(),  // MUI needs this
            name: u.name,
            country: u.country,
            email: u.email,
            phone: u.phone,
            product_interest: u.product_interest,
            status: u.status,
            next_followup: formatDateOnly(u.mongoDate),
            remark: u.remark,
            contactpersonname: u.contactpersonname,
        }));
        res.status(200).json({
            message: "Get Products Scussfully!!!",
            status: true,
            leads
        })
    } catch (error) {
        console.log("error", error)
    }
}

export const getLeadsById = async (req, res) => {
    const { _id } = req.params
    try {
        const leaddatabyId = await collections.leads.findOne({ _id: new ObjectId(_id) })
        const result = {
            ...leaddatabyId,
            next_followup: formatDateOnly(leaddatabyId.mongoDate)
        }
        console.log("result", result)
        res.status(200).json({
            status: true,
            message: "Get Leads details Scussfully!!!",
            result
        })
    } catch (error) {
        console.log("error", error)
    }
}

export const Deletelead = async (req, res) => {
    const { _id } = req.params
    const Lead = collections.leads
    try {
        const result = await Lead.deleteOne({ _id: new ObjectId(_id) })

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Lead not found" });
        }

        res.status(200).json({
            message: "lead deleted Scussfully!!!",
            status: true
        })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error.message
        });
    }
}