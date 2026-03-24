import mongoose from "mongoose";



const uploadSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true, minlength: 2 },
    
   imageUrl: {type:String, reuired:true}
  },

  { timestamps: true }
);






const Upload = mongoose.model("Upload", uploadSchema);

export default Upload;