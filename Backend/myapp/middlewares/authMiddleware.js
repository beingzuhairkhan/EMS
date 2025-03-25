import jwt from "jsonwebtoken";
import User from '../models/userModel.js';
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
      
        const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

        //console.log("Token received:", token);

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized request - No token provided" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        //console.log("Decoded Token:", decodedToken);

        // ✅ Ensure `_id` or `id` matches JWT payload
        const user = await User.findById(decodedToken.id || decodedToken._id).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
});
