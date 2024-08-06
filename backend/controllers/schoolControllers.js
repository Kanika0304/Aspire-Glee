import educationalStat from "../Models/educationalStat.js";
import school from "../Models/school.js";
import student from "../Models/student.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

export const addStudent = async (req, res) => {
    try {
        const {
            studentName,
            familyIncome,
            isDisabled,
            grade,
            percentage,
            studentId,
        } = req.body;

        // Check for required fields
        if (
            !studentName ||
            !familyIncome ||
            !isDisabled ||
            !grade ||
            !percentage ||
            !studentId
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Insufficient data. Please provide all required fields.",
            });
        }

        // Handle image upload
        let urlimage = null;
        if (req.files && req.files.studentImage) {
            const { studentImage } = req.files;
            const thumbnailURL = await uploadImageToCloudinary(
                studentImage,
                process.env.FOLDER_NAME
            );
            urlimage = thumbnailURL.secure_url;
        }

        // Create student record
        const newStudent = new student({
            studentName,
            familyIncome,
            isDisabled,
            studentImage: urlimage,
            studentId,
        });

        const savedStudent = await newStudent.save();

        // Create educational statistics record
        const newEduStat = new educationalStat({
            studentId: savedStudent._id,
            grade,
            percentage,
        });

        const savedEduStat = await newEduStat.save();

        // Link educational stats to the student
        savedStudent.educationalStat.push(savedEduStat._id);
        await savedStudent.save();

        // Fetch and update school details
        const schoolId = req.user.id; // Assumes req.user.id is the school ID

        const schoolDetails = await school.findById(schoolId);
        if (!schoolDetails) {
            return res.status(404).json({
                success: false,
                message: "School not found",
            });
        }

        schoolDetails.student.push(savedStudent._id);
        await schoolDetails.save();

        return res.status(201).json({
            success: true,
            message: "Student added successfully",
            data: {
                student: savedStudent,
                educationalStat: savedEduStat,
            },
        });
    } catch (error) {
        console.error(`Problem while adding the student: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Failed to add student. Please try again later.",
        });
    }
};

export const retrieveSchoolData = async (req, res) => {
    try {
        console.log("calling her ");
        const schoolId = req.user.id;
        console.log(schoolId);

        console.log(schoolId)

        const schoolDetails = await school.findById(schoolId).populate({
            path: "student",
            populate: {
                path: "educationalStat",
            },
        }).exec();

        if (!schoolDetails) {
            return res.status(404).json({ success:false,message: "School not found" });
        }
        console.log(schoolDetails)

        res.status(200).json({success:true,data:schoolDetails.student});
    } catch (error) {
        console.error("Error retrieving students:", error);
        res.status(500).json({ success:false,message: "Server error" });
    }
};
