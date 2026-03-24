import Upload from "../model/upload.js";

const getImage = async (req, res) => {
    try {

        console.log("Entered in getImage Extra Backend function")
        
        const images = await Upload.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            images,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default getImage;