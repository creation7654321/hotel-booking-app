import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from 'dotenv';
import { connectToDb } from "./src/config/db.js";
import authRoutes from './src/routes/User.js';
import postRoutes from './src/routes/Post.js'
import bcrypt from "bcrypt";
import fileUpload from "express-fileupload"; 
import multer from 'multer';
import path from 'path';

dotenv.config();

connectToDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

const PORT = process.env.PORT || 3000;



app.get('/',(req,res)=>{
    console.log("Welcome");
})


//Routes
app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

