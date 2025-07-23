import slugify from "slugify";
import cloudinary from "../config/Cloudinary.js";
import Post from "../models/Post.js";

export const createPostController = async(req,res)=>{
    try {
        const {
            title, 
            hotelLocation,
            description,
            images,
            isAvailable,
            guest,
            price,
            nearArea,
            facilities,
        } = req.body;

        const files = req.files?.images;
        // if (!Array.isArray(files)) {
        //     files = [files]; // convert single upload to array
        // }

        if(!title || !hotelLocation || !description ||
            isAvailable===undefined || !guest || !price || !nearArea ||
            !facilities){
                return res.status(400).json({
                    message: "All fields are required"
                })
            }
        if(files.length !==3){
            return res.status(400).json({
                message : "you must provide 3 images"
            })
        }
        
        const imageUrls = await Promise.all(
            files.map((file) =>
            cloudinary.uploader
            .upload(file.tempFilePath)
            .then((result) => result.secure_url)
            )
        )

        const newPost = new Post({
            title, 
            hotelLocation,
            description,
            images: imageUrls,
            isAvailable,
            guest,
            price,
            nearArea,
            facilities,
            slug : slugify(title, {lower:true})
        })
        await newPost.save();

        return res.status(201).json({
            message : "Post created successfully",
            post : newPost,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({

            message : "Somethin went wrong",
            
        })
    }
}


export const getPostController = async(req,res)=>{
    try {
        const post = await Post.findOne({slug: req.params.slug})
        .select("-images")
        // .populate("category");
        if(!post){
            return res.status(404).send({
                success:false,
                message: "Post not found"
            })
        }
        return res.status(200).send({
            success:true,
            message: "Post fetched succesfully",
            post,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while getting post",
            error,
        })
    }
}

export const getAllPostController = async(req,res)=>{
    try {
        const posts = await Post.find({});
        return res.status(200).send({
            success: true,
            message: "Posts fetched successfully",
            posts,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({

        })
    }
}

