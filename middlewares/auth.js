import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async(req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Please Login first !",
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    const id = decoded._id;

    // const user = await User.findById(id);
    req.user = await User.findById(id); // so that the user can be accessed from req.user

    next();
}