import CategoryModel from "../models/Category.js";
import slug from 'slugify';
import postModel from "../models/Post.js";

export const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                message: "Name is required"
            })
        }
        
        const existingCategory = await CategoryModel.findOne({name});
        if(existingCategory){
            return res.status(400).json({
                message : "Category already existed"
            })
        }
        const newCategory = await new CategoryModel({
            name,
            slug: slug(name)
        }).save();

        return res.status(200).send({
            success: true,
            message: "Category has been creatd",
            newCategory,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while creating category",
            error,
        })
    }
}

export const getAllCategoryController = async(req,res)=>{
    try {
        const categories = await CategoryModel.find({});
        return res.status(200).send({
            success: true,
            message: "Categories fetched successfulyy",
            categories,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "Error while fetching categories",
            error
        })
    }
}

export const updateCategoryController = async(req,res)=>{
    try {
        const{name} = req.body;
        const{id} = req.params;
        const category = await CategoryModel.findByIdAndUpdate(
            id,
            {name , slug:slug(name) },
            {new:true}
        );
        return res.status(200).send({
            success:true,
            message: "Category updated successflly",
            category
        })
    } catch (error) {
        return res.staus(500).send({
            success:false,
            message: "Error while updating category",
            error
        })
    }
}

export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params;
        CategoryModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            messag: "Error while deleteing category",
            error,
        })
    }
}

export const singleCategory = async(req,res)=>{
    try {
        const category = await CategoryModel.findOne({slug:req.params.slug});
        const post = await postModel.find({category}).populate("category")
        return res.send(200).send({
            success:true,
            message: "category fetched succesfully",
            category,
            post
        })
    } catch (error) {
        return res.status(404).send({
            success:false,
            messag: "Category not found",
            error,
        })
    }
}