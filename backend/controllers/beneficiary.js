import beneficiary from "../Models/beneficiary.js";

export const addBeneficiary=async(req,res)=>{
    try{
        const {beneficiaryName,location,gender,age,need}=req.body;
        const beneficiaryDetails=await beneficiary.create({beneficiaryName,location,gender,age,need});

        return res.status(200).json({
            success: true,
            message: "Success",
            data:beneficiaryDetails
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