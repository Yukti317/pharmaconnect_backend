// const mysql = require("mysql2/promise");
import dotenv from "dotenv";
dotenv.config();


// const db = mysql.createPool({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASS || '',
//     database: process.env.DB_NAME || 'pharma_crm',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

import { MongoClient } from 'mongodb' 

// { MongoClient } = require('mongodb')

const Url = "mongodb://localhost:27017/pharma_crm"
const client = new MongoClient(Url)
const dbName = 'pharma_crm';

export const db = async() =>{
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return {
        leads: db.collection("leads"),
        products: db.collection("products"),
        quotation_items: db.collection("quotation_items"),
        quotation: db.collection("quotations"),
        exports: db.collection("exports"),
        export_docs: db.collection("export_docs"),
        user:db.collection("users")
    };

}

// export  db;
