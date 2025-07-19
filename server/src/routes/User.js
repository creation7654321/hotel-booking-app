import express from "express";
import { registerController } from "../controller/User.js";

const app = express.Router();

app.post('/register',registerController);

export default app;


