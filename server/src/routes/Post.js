import express from "express";
import { createPostController, getPostController,getAllPostController, updatePostController, deletePostController, getRealtedPost } from "../controller/Post.js";
import multer from 'multer'; 
import path from 'path';

const routes = express.Router();



routes.post('/create-post',createPostController);
routes.get('/get-post/:slug',getPostController);
routes.get('/get-all-posts',getAllPostController);
routes.put('/update-post/:id',updatePostController);
routes.delete('/delete-post/:id',deletePostController);
routes.get('/related-post/:pid/:cid', getRealtedPost)
export default routes;