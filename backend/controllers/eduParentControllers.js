import donations from "../Models/donations.js";
import eduParent from "../Models/eduParent.js";
import student from "../Models/student.js";

export const scholarStudent = async (req, res) => {
    try {
        const eduId = req.user.id;
        const { tenure, count } = req.body;

        if (!tenure || !count) {
            return res.status(400).json({
                success: false,
                message: "Insufficient data",
            });
        }

        const eduParentDetails = await eduParent.findById(eduId);

        if (!eduParentDetails) {
            return res.status(404).json({
                success: false,
                message: "Educational parent not found",
            });
        }

        const studentsData = await student.find({});
        const studentsWithoutScholarship = [];

        for (let i = 0; i < studentsData.length; i++) {
            if (studentsData[i].scholarShip === null) {
                studentsWithoutScholarship.push(studentsData[i]._id);
                if (studentsWithoutScholarship.length === count) {
                    break;
                }
            }
        }

        if (studentsWithoutScholarship.length < count) {
            return res.status(400).json({
                success: false,
                message: `Only ${studentsWithoutScholarship.length} students without scholarships found, but ${count} were requested.`,
            });
        }

        for (let i = 0; i < studentsWithoutScholarship.length; i++) {
            const thisStudent = await student.findById(studentsWithoutScholarship[i]);
            thisStudent.scholarShip = eduId;
            await thisStudent.save();

            const donationEntry = await donations.create({ studentId: studentsWithoutScholarship[i], tenure });

            eduParentDetails.pastRecords.push(donationEntry._id);
        }

        await eduParentDetails.save();

        return res.status(200).json({
            success: true,
            message: "Students allocated successfully",
        });
    } catch (error) {
        console.error("Error occurred:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to allocate students",
        });
    }
};


// Function to retrieve data of all students donated by a particular eduParent
export const getStudentsDonatedByParent = async (req,res) => {
    try {
        
        const eduId=req.user.id;

        const eduDetails=await eduParent.findById(eduId).populate({
            path: "pastRecords",
            populate: {
                path: "studentId",
                populate:{
                    path:"educationalStat"
                }
            },
        }).exec();

        return res.status(200).json({
            success: true,
            data:eduDetails
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "data problem "
        });
    }
};
