import jwt from 'jsonwebtoken';

export const sendCookie = (user, res, message, statusCode = 200) => {
    // 🗝️ after Register, it logged in automatically
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRECT)

    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 15,
            sameSite: process.env.NODE_ENV === "Development_Mode" ? "lax" : "none",   // for NodeJS Deployment
            secure: process.env.NODE_ENV === "Development_Mode" ? false : true,       // for NodeJS Deployment
        }).json({
            success: true,
            message,
        })
}

