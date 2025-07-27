import express from "express";
import { createCategoryController, getAllCategoryController } from "../controller/Category.js";

const app = express.Router();

app.post('/create-category',createCategoryController);
app.get('/get-category',getAllCategoryController);

export default app;