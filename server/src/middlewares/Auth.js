import JWT from "jsonwebtoken";
import User from "../models/User.js";


// Product route based on token

// export const requireSignIn = async(req,res, next)=>{
//     try {
//         const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
//         req.user = decode;
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const requireSignIn = async(req,res, next)=>{
//     try {
//         const authHeader = req.headers.authorization;
//         const token = authHeader.split(" ")[1];
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decode;
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// }

// // Admin middleware
// export const isAdmin = async(req,res,next)=>{
//     try {
//         const user = await User.findById(req.user._id);
//         if(user?.role !== "admin"){
//             return res.status(401).send("unauthorized");
//         }
//         else{
//             next();
//         }
//     } catch (error) {
//         console.log(error);
        
//     }
// }

export const requireSignIn = async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).send({
                success: false,
                message: "Authorization header is missin"
            })
        }
        const token = authHeader.startsWith("Bearer ")? authHeader.split(" ")[1]:authHeader;
        if(!token){
            return res.status(401).send({
                success: false,
                message: "No Token provided"
            })
        }
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        if(!decode?._id && !decode?.id){
            return res.status(401).send({
                success: false,
                message: "Token does not contain user ID"
            })
        }
        req.user = decode;
        next();
    } catch (error) {
        console.log("JWT verification error:", error.message);
        return res.status(401).send({
            success: false,
            message: "Invalid or expired token"
        })
    }
}


export const isAdmin = async(req,res,next)=>{
    try {
        const userId = req?.user._id || req.user?.id;
        if(!userId){
            return res.status(401).send({
                success: false,
                message: "No user ID found in token"
            })
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found in database"
            })
        }
        if(user?.role !== "admin"){
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            })
        }
        next();
    } catch (error) {
        console.error("Error in admin middleware:",error);
        return res.status(401).send({
            success: false,
            message: "Error in admin middleware"
        })
    }
}
