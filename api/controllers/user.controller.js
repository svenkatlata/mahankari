/**
 * =====================================================
 *              USER CONTROLLER FUNCTIONS
 * =====================================================
 *
 * This file contains all the functions your backend
 * should provide for complete user authentication,
 * profile handling, avatar upload, and admin controls.
 *
 * Each function below includes:
 *  - Purpose
 *  - Expected input (req.body / req.params)
 *  - Return structure
 *  - Notes on logic you should implement
 *
 * These functions handle a full-fledged authentication and profile management system.
 * =====================================================
 */

import User from "../models/user.model.js";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../utils/sendEmail.js";
import {
  generateOtp,
  verifyOtp,
  generateAccessToken,
  generateRefreshToken,
  generateRefreshedTokens,
  verifyRefreshToken,
} from "../utils/auth.js";
import { uploadImage, deleteImage } from "../config/cloudinary.js";
import bcrypt from "bcrypt";
import validator from "validator";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

/* =====================================================
   1. REGISTER USER
   ===================================================== */
export const registerUser = async (req, res) => {
  try {
    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const password = (req.body.password || "").trim();

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Validate Email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate OTP + save it to user
    const otp = await generateOtp(newUser._id);

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      newUser.email,
      newUser.name,
      otp.otp
    );
    if (!emailResponse.success) {
      newUser.otp = null;
      newUser.otpExpiry = null;
      await newUser.save();
      return res.status(500).json({
        message: "Failed to send verification email",
        success: false,
      });
    }

    return res.status(201).json({
      message: "User registered successfully. Verification email sent.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   2. VERIFY EMAIL
   ===================================================== */
export const verifyEmail = async (req, res) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const otp = (req.body.otp || "").trim();

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
        success: false,
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        nextStep: "register",
      });
    }

    // Check if user already verified
    if (user.isVerified) {
      return res.status(200).json({
        message: "Email already verified",
        success: true,
        nextStep: "login",
      });
    }

    // Check expiration
    if (!user.otp || !user.otpExpiry || Date.now() > user.otpExpiry) {
      user.otp = null;
      user.otpExpiry = null;
      await user.save();

      return res.status(400).json({
        message: "OTP expired. Please request a new one.",
        success: false,
        nextStep: "resendOtp",
      });
    }

    // Validate OTP
    const isValid = await verifyOtp(otp, user.otp);
    if (!isValid) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
      });
    }

    // OTP is correct → verify user
    user.isVerified = true;
    user.status = "active";
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully!",
      success: true,
      nextStep: "login",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   RESEND VERIFICATION EMAIL
   ===================================================== */
export const resendVerificationEmail = async (req, res) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "User is already verified",
        success: false,
      });
    }

    // Generate new OTP
    const otp = await generateOtp(user._id);

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      user.email,
      user.name,
      otp.otp
    );

    if (!emailResponse.success) {
      return res.status(500).json({
        message: "Failed to resend OTP. Please try again later.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Verification OTP resent successfully",
      success: true,
    });
  } catch (error) {
    console.error("Resend Verification OTP Error:", error);
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   3. LOGIN USER
   ===================================================== */
export const loginUser = async (req, res) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = (req.body.password || "").trim();

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
        nextStep: "register",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
        nextStep: "register",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not registered",
        success: false,
        nextStep: "register",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
        nextStep: "forgot-password",
      });
    }

    // OTP expiry cleanup (optional safety)
    if (user.otpExpiry && Date.now() > user.otpExpiry) {
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
    }

    // Check email verification
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email is not verified.",
        success: false,
        nextStep: "verifyEmail",
      });
    }

    // Check if account is active
    if (user.status !== "active") {
      return res.status(403).json({
        message: "Your account is inactive.",
        success: false,
        nextStep: "activateAccount",
      });
    }

    // All good → generate access token
    const accessToken = generateAccessToken(user._id, user.name, user.email);
    const refreshToken = await generateRefreshToken(user._id, user.email);

    // Refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Update last login
    const updateResponse = await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar:
          user.avatars?.find((avatar) => avatar.isDefault)?.url ||
          "https://res.cloudinary.com/dmkuvcswe/image/upload/v1766914882/l60Hf_xbdswj.png",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   4. LOGOUT USER
   ===================================================== */
export const logoutUser = async (req, res) => {
  try {
    const userId = req.userId; // middleware

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    // Clear cookies
    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("accessToken", cookieOptions);

    // Update refresh token in DB
    const updateResponse = await User.findByIdAndUpdate(userId, {
      refreshToken: "",
    });

    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   5. REFRESH ACCESS TOKEN
   ===================================================== */
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is missing",
        success: false,
      });
    }

    const verificationResult = verifyRefreshToken(refreshToken);
    if (verificationResult.error) {
      return res.status(401).json({
        message: verificationResult.error,
        success: false,
      });
    }

    const newAccessToken = await generateRefreshedTokens(refreshToken);

    // Set new access token cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 5 * 60 * 60 * 1000, // 5 hours
    });

    return res.status(200).json({
      message: "Access token refreshed",
      accessToken: newAccessToken,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   6. FORGOT PASSWORD
   ===================================================== */
export const forgotPassword = async (req, res) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found with this email",
        success: false,
      });
    }

    // Generate new OTP
    const otp = await generateOtp(user._id);

    // Send OTP (email or SMS)
    await sendResetPasswordEmail(user.email, user.name, otp.otp);

    // Email cookie
    res.cookie("userEmail", user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 10 * 60 * 1000, // 10 minutes
    });

    return res.status(200).json({
      message: "OTP sent to your registered email",
      success: true,
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   7. RESET PASSWORD
   ===================================================== */
export const resetPassword = async (req, res) => {
  try {
    const email =
      req.cookies.userEmail || (req.body.email || "").trim().toLowerCase();
    const newPassword = (req.body.newPassword || "").trim();
    const otp = (req.body.otp || "").trim();

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP and new password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.otp || !user.otpExpiry) {
      return res.status(400).json({
        message: "Invalid reset request",
        success: false,
      });
    }

    // Check OTP validity
    const isValid = await verifyOtp(otp, user.otp);
    if (!isValid) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
      });
    }

    // Check expiration
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP expired",
        success: false,
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    // Clear email cookie
    res.clearCookie("userEmail", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return res.status(200).json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   8. CHANGE PASSWORD (LOGGED IN)
   ===================================================== */
export const changePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Old and new passwords are required",
        success: false,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // ✅ Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect old password",
        success: false,
      });
    }

    // ✅ Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Change Password Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   9. GET CURRENT USER (For Auth Check)
   ===================================================== */
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select(
      "_id name email role status avatars"
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const defaultAvatar =
      user.avatars?.find((avatar) => avatar.isDefault)?.url ||
      "https://res.cloudinary.com/dmkuvcswe/image/upload/v1766914882/l60Hf_xbdswj.png";

    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: defaultAvatar,
      },
    });
  } catch (error) {
    console.error("Get Current User Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   9. GET USER PROFILE
   ===================================================== */
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }

    const user = await User.findById(userId)
      .select("-password -otp -otpExpiry -refreshToken") // hide sensitive data
      .populate("addresses")
      .populate("cart")
      .populate("orders")
      .lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User profile fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get User Profile Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   9. UPDATE USER PROFILE - name, mobile
   ===================================================== */
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }

    // Allowed fields to update
    const allowedUpdates = ["name", "mobile"];

    // Detect invalid fields
    const invalidFields = Object.keys(req.body).filter(
      (field) => !allowedUpdates.includes(field)
    );
    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: `Invalid update fields: ${invalidFields.join(", ")}`,
        success: false,
      });
    }

    // Only allow safe fields to be updated
    const updateData = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
        success: false,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .select("-password -otp -otpExpiry -refreshToken")
      .populate("addresses")
      .populate("cart")
      .populate("orders");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Profile Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   10. UPLOAD USER AVATARS (Cloudinary)
   ===================================================== */
export const uploadAvatars = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No images uploaded",
        success: false,
      });
    }

    const uploadedImages = [];

    // Upload each file to Cloudinary
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const result = await uploadImage(file.path, "uploads");
      if (!result.success) {
        return res.status(500).json({
          message: result.message,
          success: false,
        });
      }

      uploadedImages.push({
        secureUrl: result.secureUrl,
        publicId: result.publicId,
        isDefault: i === 0,
      });

      // Delete local file
      fs.unlinkSync(file.path);

      console.log("Uploaded:", file.filename);
    }

    if (Array.isArray(uploadedImages) && uploadedImages.length > 0) {
      // Unset all previous defaults
      await User.updateOne(
        { _id: userId },
        { $set: { "avatars.$[].isDefault": false } }
      );
    }

    // Push all images into user's avatars array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { avatars: { $each: uploadedImages } },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Photos uploaded successfully",
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   11. SET DEFAULT USER AVATAR (Cloudinary)
   ===================================================== */
export const setDefaultAvatar = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { avatarId } = req.params; // image _id from URL

    if (!avatarId) {
      return res.status(400).json({
        message: "Avatar ID is required",
        success: false,
      });
    }

    // Remove default flag from all images
    await User.updateOne(
      { _id: userId },
      {
        $set: { "avatars.$[].isDefault": false },
      }
    );

    // Set selected image as default
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "avatars._id": avatarId },
      {
        $set: { "avatars.$.isDefault": true },
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Avatar not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Default avatar updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   12. GET ALL USER AVATARS
   ===================================================== */
export const getAvatars = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("avatars");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Avatars fetched successfully",
      success: true,
      avatars: user.avatars,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   13. GET SINGLE USER AVATAR
   ===================================================== */
export const getSingleAvatar = async (req, res) => {
  try {
    const userId = req.userId;
    const { avatarId } = req.params;

    if (!avatarId) {
      return res.status(400).json({
        message: "Avatar ID is required",
        success: false,
      });
    }

    const user = await User.findById(userId).select("avatars");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const avatar = user.avatars.find((img) => img._id.toString() === avatarId);

    if (!avatar) {
      return res.status(404).json({
        message: "Avatar not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Avatar fetched successfully",
      success: true,
      avatar,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   14. DELETE USER AVATAR (CLOUDINARY)
   ===================================================== */
export const deleteAvatar = async (req, res) => {
  try {
    const userId = req.userId;
    const { avatarId } = req.params;

    if (!avatarId) {
      return res.status(400).json({
        message: "Avatar ID is required",
        success: false,
      });
    }

    // Get user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Find avatar
    const avatarToDelete = user.avatars.find(
      (img) => img._id.toString() === avatarId
    );

    if (!avatarToDelete) {
      return res.status(404).json({
        message: "Avatar not found",
        success: false,
      });
    }

    // Delete from Cloudinary
    if (avatarToDelete.publicId) {
      await deleteImage(avatarToDelete.publicId);
    }

    // Remove from DB
    await User.updateOne(
      { _id: userId },
      { $pull: { avatars: { _id: avatarId } } }
    );

    // If deleted avatar was default → set new default
    if (avatarToDelete.isDefault) {
      const updatedUser = await User.findById(userId);

      if (updatedUser.avatars.length > 0) {
        updatedUser.avatars[0].isDefault = true;
        await updatedUser.save();
      }
    }

    return res.status(200).json({
      message: "Avatar deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   15. BULK DELETE USER AVATARS
   ===================================================== */
export const deleteMultipleAvatars = async (req, res) => {
  try {
    const userId = req.userId;
    const { avatarIds } = req.body; // array of avatar _ids

    if (!Array.isArray(avatarIds) || avatarIds.length === 0) {
      return res.status(400).json({
        message: "avatarIds array is required",
        success: false,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // 🔥 Get only avatars that actually belong to this user
    const avatarsToDelete = user.avatars.filter((img) =>
      avatarIds.includes(img._id.toString())
    );

    if (avatarsToDelete.length === 0) {
      return res.status(404).json({
        message: "No matching avatars found",
        success: false,
      });
    }

    // Delete from Cloudinary
    for (const avatar of avatarsToDelete) {
      if (avatar.publicId) {
        await deleteImage(avatar.publicId);
      }
    }

    // Remove from MongoDB
    await User.updateOne(
      { _id: userId },
      {
        $pull: {
          avatars: { _id: { $in: avatarIds } },
        },
      }
    );

    // Ensure one default always exists
    const updatedUser = await User.findById(userId);

    if (updatedUser.avatars.length > 0) {
      const hasDefault = updatedUser.avatars.some((a) => a.isDefault);
      if (!hasDefault) {
        updatedUser.avatars[0].isDefault = true;
        await updatedUser.save();
      }
    }

    return res.status(200).json({
      message: "Selected avatars deleted successfully",
      success: true,
      deletedCount: avatarsToDelete.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   16. ADMIN — GET ALL USERS
   ===================================================== */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All users fetched successfully",
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   17. ADMIN — GET SINGLE USER
   ===================================================== */
export const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   18. ADMIN — UPDATE USER ROLE
   ===================================================== */
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body; // "admin" | "user"

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role value",
        success: false,
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: `User role updated to ${role}`,
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   19. ADMIN — UPDATE USER STATUS
   ===================================================== */
export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body; // "active" | "inactive"

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        success: false,
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: `User status updated to ${status}`,
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

/* =====================================================
   20. ADMIN — DELETE USER
   ===================================================== */
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Delete all avatars from Cloudinary
    if (user.avatars?.length) {
      for (const avatar of user.avatars) {
        if (avatar.publicId) {
          await deleteImage(avatar.publicId);
        }
      }
    }

    // Delete user from MongoDB
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};
