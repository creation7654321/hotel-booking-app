import CategoryModel from "../models/Category.js";
import slug from 'slugify';


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
