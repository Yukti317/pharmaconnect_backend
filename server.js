import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load .env
dotenv.config();

// Connect DB
import { db } from "./db.js";

// Import Routes
import authrouter from "./routes/auth_routes/auth_route.js";
import adminroutes from "./routes/admin_routes/admin_routes.js";
import userRoutes from "./routes/admin_routes/user_routes.js";
import productRoutes from './routes/product_routes/product_routes.js'
import leadRoutes from './routes/lead_routes/lead_routes.js'
const app = express()
app.use(express.json())
app.use(cors({
    origin: "https://pharmaconnect-front.vercel.app", // change to live url
    // origin: "http://localhost:3000", // change to live url
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
    credentials: true
}));
app.use("/api/auth", authrouter)
app.use("/api/admin", adminroutes)   
app.use("/api/admin",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/leads",leadRoutes)

const port = process.env.Port || 5000
app.get("/", (req, res) => {
    res.send("Node js code deployedd...")
})
app.listen(port)