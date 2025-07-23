import express from "express";
import { createPostController, getPostController,getAllPostController } from "../controller/Post.js";
import multer from 'multer'; 
import path from 'path';

const routes = express.Router();



routes.post('/create-post',createPostController);
routes.get('/get-post/:slug',getPostController);
routes.get('/get-all-posts',getAllPostController);

export default routes;