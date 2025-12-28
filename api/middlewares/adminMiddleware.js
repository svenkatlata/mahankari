/* =====================================================
   ADMIN MIDDLEWARE — RESTRICT TO ADMINS ONLY
   ===================================================== */
import User from "../models/user.model.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId; // set by authMiddleware

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }

    const user = await User.findById(userId).select("role status");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Block inactive admins too
    if (user.status !== "active") {
      return res.status(403).json({
        message: "Account is inactive. Access denied.",
        success: false,
      });
    }

    // Only allow admins
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

export default adminMiddleware;
