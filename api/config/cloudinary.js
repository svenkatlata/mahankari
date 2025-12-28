import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads an image file to Cloudinary
 * @param {string} filePath - Path of the file to upload
 * @param {string} folder - Optional folder name
 * @returns {Promise<object>} - Cloudinary upload result
 */
export const uploadImage = async (filePath, folder = "uploads") => {
  try {
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      folder: folder,
      resource_type: "image",
    };
    const result = await cloudinary.uploader.upload(filePath, options);

    return {
      publicId: result.public_id,
      secureUrl: result.secure_url,
      success: true,
      error: false,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return {
      message: `Cloudinary upload failed: ${error.message || error.toString()}`,
      success: false,
      error: true,
    };
  }
};

/**
 * Deletes an image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 */
export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return {
      message: "Image deleted successfully!",
      success: true,
      error: false,
    };
  } catch (error) {
    return {
      message: `Error deleting image: ${error.message || error.toString()}`,
      success: false,
      error: true,
    };
  }
};

/**
 * Returns the Cloudinary image URL from a public ID
 * @param {string} publicId - Cloudinary public ID
 * @returns {string} image URL
 */
export const getImage = (publicId) => {
  try {
    if (!publicId) {
      throw new Error("Public ID is required");
    }

    // Generate secure URL from publicId
    const secureUrl = cloudinary.url(publicId, {
      secure: true,
      resource_type: "image",
    });

    return {
      secureUrl: secureUrl,
      success: true,
      error: false,
    };
  } catch (error) {
    return {
      message: `Error fetching image: ${error.message}`,
      success: false,
      error: true,
    };
  }
};
