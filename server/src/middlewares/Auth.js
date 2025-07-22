import jwt from "jsonwebtoken";
import User from "../models/User";


// Product route based on token

export const requireSignIn = async(req,res, next)=>{
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

// Admin middleware
export const isAdmin = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user._id);
        if(user.role !== "admin"){
            return res.status(401).send("unauthorized");
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        
    }
}

