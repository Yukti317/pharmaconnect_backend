import { db } from '../db.js'
import { ObjectId } from "mongodb";
const collections = await db();


export const addProduct = async (req, res) => {
    const { name, category, strength, price, availability, countryregistration, description, packing } = req.body
    try {
        if (!name || !category || !strength || !price || !availability || !countryregistration || !packing) {
            res.status(400).json({
                message: "Please add all requried fields"
            })
        }
        const addProduct = await collections.products
        const newProduct = await addProduct.insertOne({
            name, category, strength, price, availability, countryregistration, description, packing
        })
        console.log("newProduct", newProduct)
        res.status(200).json({
            status: true,
            message: "Product is added scussfully!!!"
        })
    } catch (error) {
        console.log("error", error)
    }
}
export const UpdateProduct = async (req, res) => {
    const { id, name, category, strength, price, availability, countryregistration, description, packing } = req.body
    try {
        const productfind = await collections.products
        const findByid = await productfind.findOne({ _id: new ObjectId(id) })
        if (findByid.length === 0)
            return res.status(400).json({
                success: false,
                message: "Product is not exist",
            });

        const editProduct = await productfind.updateOne({ _id: new ObjectId(id) }, { $set: { name, category, strength, price, availability, countryregistration, description, packing } })
        res.status(200).json({
            message: "Product Updated!!!",
            status: true
        })
    } catch (error) {
        console.log("error", error)
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const rawProducts = await collections.products.find({}).toArray()
        const products = rawProducts.map((u, i) => ({
            id: i + 1,
            _id: u._id.toString(),  // MUI needs this
            productname: u.name,
            category: u.category,
            strength: u.strength,
            price: u.price,
            availability: u.availability,
            countryregistration: u.countryregistration,
            description: u.description,
            packing: u.packing,
            created_at: u.created_at,
        }));
        res.status(200).json({
            message: "Get Products Scussfully!!!",
            status: true,
            products
        })
    } catch (error) {
        console.log("error", error)
    }


}

export const getProdustById = async (req, res) => {
    const { _id } = req.params
    try {
        const result = await collections.products.findOne({ _id: new ObjectId(_id) })
        res.status(200).json({
            message: "Get products details Scussfully!!!",
            result
        })
    } catch (error) {
        console.log("error", error)
    }
}

export const deleteproductbyid = async (req, res) => {
    const { _id } = req.params
    const product = collections.products
    try {
        const result = await product.deleteOne({ _id: new ObjectId(_id) })

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "product not found" });
        }

        res.status(200).json({
            message: "product deleted Scussfully!!!",
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