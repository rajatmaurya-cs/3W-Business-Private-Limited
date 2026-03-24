import User from '../model/user.js'
import bcrypt from "bcryptjs";

const authsignIn = async (req,res)=>{

    try{

    console.log("Entered in authsignIn")
      
    const {name , email , password} = req.body;

    console.log(name , email , password)

    const hashpassword = await bcrypt.hash(password,10);


    await User.create({
        name:name,
        email:email,
        password:hashpassword,
       
    });

    res.status(201).json({
        success:true,
        message: "User Created"
    })

    
    }catch(error){
      console.log(error)
        res.status(404).json({
            success:false,
            message:"Error while Creating User"
        })

    }

}




const authlogin = async (req, res) => {
  try {

    console.log("entered in authlogin")
    
    const { email, password } = req.body;

  
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

   
    return res.status(200).json({
      success: true,
      message: "Logged In"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export  {authsignIn, authlogin}