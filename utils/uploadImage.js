import cloudinary from "../src/config/storage.js";


const uploadSingleImage = async (file, folder = "ProfileImages") => {
    // Upload an image
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    const uploadResult = await cloudinary.v2.uploader.upload(base64Image, {
        folder: folder,
        public_id: folder + Date.now(),
    });

    return uploadResult
}

export default uploadSingleImage