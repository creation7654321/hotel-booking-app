import cloudinary from "../config/Cloudinary";
import Post from "../models/Post";

export const createPostController = async(req,res)=>{
    try {
        const {
            title, 
            hotelLocation,
            description,
            category,
            images,
            isAvailable,
            guest,
            price,
            nearArea,
            falilities,
        } = req.body;

        const files = req.files?.images;

        if(!title || !hotelLocation || !description ||
            category || images || isAvailable || guest ||price,
            nearArea ||
            falilities){
                return res.status(400).json({
                    message: "All fields are required"
                })
            }
        if(!files || files.length !==3){
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
            category,
            images,
            isAvailable,
            guest,
            price,
            nearArea,
            falilities,
            images: imageUrls,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Somethin went wrong"
        })
    }
}
