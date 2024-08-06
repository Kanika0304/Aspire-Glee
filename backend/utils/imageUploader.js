import { v2 as cloudinary } from 'cloudinary';

export const uploadImageToCloudinary = async (file, folder, quality, height) => {
    try {
        const options = { 
            folder, 
            resource_type: "auto"
        };
        if (quality) options.quality = quality;
        if (height) options.height = height;

        const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, options);
        return uploadResponse;
    } catch (error) {
        console.error(`Error occurred while uploading to Cloudinary: ${error.message}`);
        throw new Error('Cloudinary upload failed');
    }
};
