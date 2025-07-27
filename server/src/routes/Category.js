import express from "express";
import { createCategoryController, getAllCategoryController,updateCategoryController, deleteCategoryController, singleCategory } from "../controller/Category.js";
import { isAdmin ,requireSignIn} from "../middlewares/Auth.js";
const app = express.Router();

app.post('/create-category',isAdmin,requireSignIn,createCategoryController);
app.get('/get-category',isAdmin, requireSignIn,getAllCategoryController);
app.put('/update-category/:id',isAdmin, requireSignIn, updateCategoryController);
app.delete('/delete-category/:id',isAdmin, requireSignIn,deleteCategoryController);
app.get('single-category/:slug',singleCategory)
export default app;