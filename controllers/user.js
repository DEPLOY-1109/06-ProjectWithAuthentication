import { User } from "../models/user.js"
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => { }

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        // if (user) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "User already exists !",
        //     })
        // }
        // ✨ or
        if (user) return next(new ErrorHandler("User already exists !!", 404));


        console.log("Working till here")
        const hashedPassword = await bcrypt.hash(password, 10);
        // const hashedPassword = await bcrypt.hash(password, 10).then(() => { console.log("Password hashed Success") }).catch((e) => console.log(e));

        user = await User.create({ name: name, email: email, password: hashedPassword });

        // 🗝️ after Register, it logged in automatically
        sendCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
   try {
       const { email, password } = req.body;
       const user = await User.findOne({ email }).select("+password");

       // if (!user) {
       //     return res.status(404).json({
       //         success: false,
       //         message: "Invalid Email or Password",
       //     })
       // }
       // or
       if (!user) { next(new ErrorHandler("Invalid Email or Password @", 404)) }


       const isMatch = await bcrypt.compare(password, user.password);

       // if (!isMatch) {
       //     return res.status(404).json({
       //         success: false,
       //         message: "Invalid Email or Password."
       //     })
       // }
       // ✨ or
       if (!isMatch) { next(new ErrorHandler("Invalid Email or Password.", 404)) }

       sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
   } catch (error) {
       next(error);
   }
}

export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })

}

// console.log("process.env.NODE_ENV :", process.env.NODE_ENV);
// console.log(process.env.NODE_ENV === "Development");

export const logout = (req, res) => {
    res.status(200).cookie('token', "", { expires: new Date(Date.now()) }).json({
        success: true,
        message: "Logout Successfully",
        user: req.user,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",   // for NodeJS Deployment
        secure: process.env.NODE_ENV === "Development" ? false : true,       // for NodeJS Deployment
    })

}


