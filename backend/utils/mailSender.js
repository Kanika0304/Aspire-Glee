import nodemailer from 'nodemailer'

export const mailSender=async(email,title,body)=>{
    try{
        const transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });
        const info=await transporter.sendMail({
            from:"Aspire and Glee : By Team 66",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        return info;
    }
    catch(error){
        console.log("Error occuring in mail sending config",error);
    }
}