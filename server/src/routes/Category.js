import express from "express";
import { createCategoryController, getAllCategoryController,updateCategoryController } from "../controller/Category.js";
import { isAdmin ,requireSignIn} from "../middlewares/Auth.js";
const app = express.Router();

app.post('/create-category',isAdmin,requireSignIn,createCategoryController);
app.get('/get-category',isAdmin, requireSignIn,getAllCategoryController);
app.put('/update-category/:id',isAdmin, requireSignIn, updateCategoryController);

export default app;