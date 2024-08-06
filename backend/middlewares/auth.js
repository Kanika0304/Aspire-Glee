import jwt from "jsonwebtoken"

//auth middle ware 

export const auth=async(req,res,next)=>{
    try{
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(500).json({
                success:false,
                message:"TOKEN NOT FOUND",
            })
        }

        try{
            //decoding the toekn 
            const decodedtoken=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decodedtoken
        }catch(error){
            return res.status(500).json({
                success:false,
                message:"Error in token",
                error
            })
        }

        next();
    }
    catch(error){
        console.log("Error occured in authentication middleware",error);
        return res.status(500).json({
            success:false,
            message:"Authentication failed",
        })
    }
}
