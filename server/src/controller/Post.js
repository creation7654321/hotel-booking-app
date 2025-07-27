import slugify from "slugify";
import cloudinary from "../config/Cloudinary.js";
import Post from "../models/Post.js";

export const createPostController = async(req,res)=>{
    try {
        const {
            title, 
            hotelLocation,
            description,
            isAvailable,
            guest,
            price,
            nearArea,
            facilities,
            category,

        } = req.body;

        const files = req.files?.images;
        // if (!Array.isArray(files)) {
        //     files = [files]; // convert single upload to array
        // }

        if(!title || !hotelLocation || !description ||
            isAvailable===undefined || !guest || !price || !nearArea ||
            !facilities || !category){
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
            category,
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
        .populate("category");
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
            message: "error fetching all data"
        })
    }
}

export const updatePostController = async (req,res)=>{
    try {
        const {id} = req.params;
        const {title, hotelLocation ,description, nearArea, category, guest, isAvailable, price } = req.body;
        const files = req.files?.images;

        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        if(!title &&
            !hotelLocation &&
            !description &&
            !images &&
            !isAvailable &&
            !guest &&
            !price &&
            !nearArea &&
            !facilities && !files)
            {
                return res.status(400).json({
                    message: "No fields provided to update"
                })
            }

        // Handel image update
        let uploadImage = post.images;
        if(files && files.length === 3){
            await Promise.all(
                post.images.map((url)=> {
                    const publicId = url.split("/").pop().split(".")[0];
                    return cloudinary.uploader.destroy(publicId);
                })
            )

            //upload new images
            uploadImage = await Promise.all(
                files.map((file)=>
                    cloudinary.uploader
                    .upload(file.tempFilePath)
                    .then((result)=>result.secure_url)
                )
            )
        }
        else if(files && files.length !== 3){
            return res.status(400).json({
                message:"Please upload exactly 3 images"
            })
        }

        //upload the post 
        const updatePost = await Post.findByIdAndUpdate(id,{
            ...(title && {title}),
            ...(hotelLocation && {hotelLocation}),
            ...(description && {description}),
            ...(facilities && {facilities}),
            ...(nearArea && {nearArea}),
            ...(guest && {guest}),
            ...(isAvailable !== undefined && {isAvailable}),
            ...(price && {price}),
            ...(files && {images: uploadImage}),
            ...(title && {slug: slug(title, {lower:true})}),
        })

        await updatePost.save();
        return res.status(200).send({
            success: true,
            message : "Post updated succesfully",
            updatePost,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message : "error while updating post",
            error
        })
    }
}

export const deletePostController = async(req,res)=>{
    try {
        const id = req.params.id;
        const postToDelte = await Post.findByIdAndDelete(id);
        if(!postToDelte){
            return res.status(500).send({
                message: "Post not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Post defalted succesfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "delte post api error"
        })
    }
}

