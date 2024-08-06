import educationalStat from "../Models/educationalStat.js";
import eduParent from "../Models/eduParent.js";
import student from "../Models/student.js";
import { mailSender } from "../utils/mailSender.js";
export const addData = async (req, res) => {
    try {
        const { studentId, grade, percentage } = req.body;
        if (!studentId || !grade || !percentage) {
            return res.status(500).json({
                success: false,
                message: "Insufficnet Data",
            });
        }

        const studentDetails = await student.findOne({ studentId });

        const parentId = studentDetails.scholarShip;
        const parentDetails = await eduParent.findById(parentId);

        try {
            await mailSender(
                parentDetails.email,
                "Updation of report card of your ward",
                `
                
                Dear ${parentDetails.parentName},

We are pleased to inform you that your ward[${studentDetails.studentName}]'s academic records have been successfully updated. Our diligent evaluation process ensures that your child's progress is accurately reflected in our system. This update includes the latest grades and percentage achievements, providing a comprehensive view of their academic performance. We believe in maintaining transparent communication with our esteemed parents, and this update is part of our commitment to keeping you informed about your child's educational journey. If you have any questions or need further assistance, please do not hesitate to reach out to us. Thank you for your continued support.

Best regards,

Aspire & Glee



`
            );
        } catch (error) {
            console.log(
                "some error occured while sending the mail ",
                error.message
            );
        }

        const educationDetails = await educationalStat.create({
            studentId: studentDetails._id,
            grade,
            percentage,
        });

        studentDetails.educationalStat.push(educationDetails._id);
        await studentDetails.save();

        return res.status(200).json({
            success: true,
            message: "Data added successfully",
        });
    } catch (error) {
        console.log("Galti hogyi ", error.message);
        return res.status(500).json({
            success: false,
            message: "data addition failed",
        });
    }
};
