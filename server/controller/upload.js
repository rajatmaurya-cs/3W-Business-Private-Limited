import Upload from "../model/upload.js";
import imageKit from "../utils/Imgekie.js"
import fs from "fs";
const uploadImage = async (req, res) => {
    try {
        const { description } = req.body;

        if (!description) {
           
            return res.status(400).json({
                success: false,
                message: "Description is required",
            });
        }

        if (!req.file) {
            console.log(error.message)
            return res.status(400).json({
                success: false,
                message: "File is required",
            });
        }

        const fileBuffer = fs.readFileSync(req.file.path);

        const uploadResponse = await imageKit.upload({
            file: fileBuffer,
            fileName: `${Date.now()}-${req.file.originalname}`,
            folder: "/blogs",
        });

        // cleanup local file
        fs.unlinkSync(req.file.path);

        if (!uploadResponse?.url) {
            throw new Error("Image upload failed");
        }

        const newUpload = await Upload.create({
            description,
            imageUrl: uploadResponse.url,
        });

        return res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            data: newUpload,
        });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default uploadImage;