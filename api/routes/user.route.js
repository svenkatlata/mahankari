import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

// Controller imports
import {
  registerUser,
  verifyEmail,
  resendVerificationEmail,
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  changePassword,
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  uploadAvatars,
  getAvatars,
  getSingleAvatar,
  deleteAvatar,
  deleteMultipleAvatars,
  setDefaultAvatar,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

/* ================= AUTH ROUTES ================= */
userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/resend-verification-email", resendVerificationEmail);
userRouter.post("/login", loginUser);
userRouter.post("/logout", authMiddleware, logoutUser);
userRouter.post("/refresh", refreshAccessToken);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.put("/change-password", authMiddleware, changePassword);

/* ================= PROFILE ROUTES ================= */
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.put("/profile", authMiddleware, updateUserProfile);

/* ================= AVATAR ROUTES ================= */
userRouter.put(
  "/upload-avatars",
  authMiddleware,
  upload.array("avatars"),
  uploadAvatars
);

userRouter.get("/avatars", authMiddleware, getAvatars);
userRouter.get("/avatars/:avatarId", authMiddleware, getSingleAvatar);
userRouter.delete("/avatars/:avatarId", authMiddleware, deleteAvatar);
userRouter.delete("/avatars/bulk", authMiddleware, deleteMultipleAvatars);
userRouter.put("/avatars/:avatarId/default", authMiddleware, setDefaultAvatar);

/* ================= ADMIN ROUTES ================= */
userRouter.get("/admin/users", authMiddleware, adminMiddleware, getAllUsers);

userRouter.get(
  "/admin/users/:userId",
  authMiddleware,
  adminMiddleware,
  getSingleUser
);

userRouter.put(
  "/admin/users/:userId/role",
  authMiddleware,
  adminMiddleware,
  updateUserRole
);

userRouter.put(
  "/admin/users/:userId/status",
  authMiddleware,
  adminMiddleware,
  updateUserStatus
);

userRouter.delete(
  "/admin/users/:userId",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

export default userRouter;
