//-------------------------------------------------------
//  AUTH UTILITY FUNCTIONS (auth.js)
//-------------------------------------------------------
//
// This file handles all JWT token generation + validation.
// It is used by controllers such as register, login,
// email verification, password reset, and admin features.
//
// Tokens included:
//  - Access Token
//  - Refresh Token
//  - Email Verification Token
//  - Password Reset Token
//
// Each token uses its own secret & expiration time.
//
//-------------------------------------------------------

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

//-------------------------------------------------------
// 1. Generate Access Token (Short-lived token)
//-------------------------------------------------------
export const generateAccessToken = (userId, userName, userEmail) => {
  return jwt.sign(
    { id: userId, name: userName, email: userEmail },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5h" } // recommended short expiry
  );
};

//-------------------------------------------------------
// 2. Generate Refresh Token (Long-lived token)
//-------------------------------------------------------
export const generateRefreshToken = async (userId, userEmail) => {
  const refreshToken = jwt.sign(
    { id: userId, email: userEmail },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Typical expiry
  );

  const salt = await bcrypt.genSalt(10);
  const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
  const updateResponse = await User.updateOne(
    { _id: userId },
    {
      refreshToken: hashedRefreshToken,
    }
  );
  return refreshToken;
};

//-------------------------------------------------------
// 3. Generate OTP
//-------------------------------------------------------
export const generateOtp = async (userId, length = 6, expiryMinutes = 10) => {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  const otp = {
    otp: Math.floor(min + Math.random() * (max - min)).toString(),
    otpExpiry: Date.now() + expiryMinutes * 60 * 1000,
  };

  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(otp.otp, salt);

  await User.findByIdAndUpdate(userId, {
    otp: hashedOtp,
    otpExpiry: otp.otpExpiry,
  });

  return otp;
};

//-------------------------------------------------------
// 4. VERIFY OTP
//-------------------------------------------------------
export const verifyOtp = async (enteredOtp, savedOtp) => {
  return await bcrypt.compare(enteredOtp, savedOtp);
};

//-------------------------------------------------------
// 5. Generate Password Reset Token
//-------------------------------------------------------
export const generatePasswordResetToken = (userId, userEmail) => {
  return jwt.sign(
    { id: userId, email: userEmail },
    process.env.PASSWORD_RESET_SECRET,
    { expiresIn: "15m" } // short expiry for security
  );
};

//-------------------------------------------------------
// 6. Generate Refreshed Tokens
//-------------------------------------------------------
export const generateRefreshedTokens = async (refreshToken) => {
  try {
    // Verify JWT signature & expiry
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user
    const user = await User.findById(decoded.id);

    if (!user || !user.refreshToken) {
      throw new Error("Invalid session. Please login again.");
    }

    // Compare refresh token with hashed version in DB
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isValid) {
      throw new Error("Refresh token mismatch. Please login again.");
    }

    // Generate new tokens
    return generateAccessToken(user._id, user.name, user.email);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        error: "Refresh token expired",
        expired: true,
      };
    }

    return {
      error: "Invalid refresh token",
      expired: false,
    };
  }
};

//-------------------------------------------------------
// 7. Verify Access Token
//-------------------------------------------------------
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    if (error.name === "TokenExpiredError") {
      return {
        error: "Access token expired",
        expired: true,
      };
    }

    return {
      error: "Invalid access token",
      expired: false,
    };
  }
};

//-------------------------------------------------------
// 8. Verify Refresh Token
//-------------------------------------------------------
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    if (error.name === "TokenExpiredError") {
      return {
        error: "Refresh token expired",
        expired: true,
      };
    }

    return {
      error: "Invalid refresh token",
      expired: false,
    };
  }
};
