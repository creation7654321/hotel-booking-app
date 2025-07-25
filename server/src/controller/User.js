import userModel from '../models/User.js'
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken';

export const registerController = async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error : "Please fill all the required details"
            })
        };

        const user = await userModel.findOne({email});
        if(user){
            return res.status(400).json({
                error : "User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel({
            name,
            email,
            password : hashedPassword,
        })
        await newUser.save();
        return res.status(200).send({
            success: true,
            message : 'User has been register',

        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message : "Problem in register API",
        })
    }
}

export const loginController = async(req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error : "All fields are required"
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                error: "Invalid user detials"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                error : "Invalid password"
            })
        }
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        return res.status(200).send({
            succes: true,
            message: "login successful",
            token,
            user:{
                id:user._id,
                email: user.email,
                name:user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message:"Problem in login API"
        })
    }
}