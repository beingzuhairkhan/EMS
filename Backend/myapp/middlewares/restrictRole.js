import User from '../models/userModel.js';
import { asyncHandler } from "../utils/asyncHandler.js";

export const restrict = asyncHandler(async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userId = req.user._id;
        console.log("User ID:", userId);

       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: 'Unauthorized to access this route' });
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
