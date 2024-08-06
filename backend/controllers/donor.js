import donars from "../Models/donor.js";

export const addDonor=async(req,res)=>{
    try{
        const {DonarName,email,phoneNumber,clothingType,quantity,condition}=req.body;
        const DonarDetails=await donars.create({DonarName,email,phoneNumber,clothingType,quantity,condition});

        return res.status(200).json({
            success: true,
            message: "Success",
            data:DonarDetails
        });
    }
    catch(error){
        console.log("Errro",error.message);
        return res.status(500).json({
            success: false,
            message: "Error message"
        });
    }
} 