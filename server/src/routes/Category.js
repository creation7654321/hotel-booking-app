import express from "express";
import { createCategoryController, getAllCategoryController,updateCategoryController, deleteCategoryController, singleCategory } from "../controller/Category.js";
import { isAdmin ,requireSignIn} from "../middlewares/Auth.js";
const app = express.Router();

// app.post('/create-category',isAdmin,requireSignIn,createCategoryController);
app.post('/create-category',createCategoryController);
app.get('/get-category',getAllCategoryController);
// app.put('/update-category/:id',isAdmin, requireSignIn, updateCategoryController);
app.put('/update-category/:id',updateCategoryController);
// app.delete('/delete-category/:id',isAdmin, requireSignIn,deleteCategoryController);
app.delete('/delete-category/:id',deleteCategoryController);
app.get('single-category/:slug',singleCategory)
export default app;