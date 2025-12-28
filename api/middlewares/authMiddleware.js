import { verifyAccessToken } from "../utils/auth.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Get access token from cookie
    const accessToken =
      req.cookies.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        message: "Not authenticated. Access token missing.",
        success: false,
      });
    }

    // Verify token
    const decoded = verifyAccessToken(accessToken);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid access token.",
        success: false,
      });
    }
    // Attach userId to request
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token.",
      success: false,
    });
  }
};

export default authMiddleware;
