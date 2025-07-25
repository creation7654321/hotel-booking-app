import express from "express";
import { loginController, registerController } from "../controller/User.js";
import {requireSignIn, isAdmin} from '../middlewares/Auth.js'
const app = express.Router();

app.post('/register',registerController);
app.post('/login',loginController);

//protected routes for user
app.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ ok: true});
})

app.get('/is-admin',requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok: true});
})

export default app;


