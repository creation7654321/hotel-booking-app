import express from "express";
import { createPostController } from "../controller/Post.js";


const routes = express.Router();

routes.post('/create-post',createPostController)

export default routes;