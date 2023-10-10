// npm i bcrypt

import express from 'express';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';   // npm i cookie-parser
import { ErrorMiddleware } from './middlewares/error.js';
import cors from 'cors'; // npm i cors ~for Node JS Deployment

export const app = express();

config({
    path: "./data/config.env"
})

// Using Middlewares
app.use(cookieParser());  // for accessing cookie for fetching user id from cookie to showProfile of user
app.use(bodyParser.json()); // for parsing application/json from postman
app.use(
    cors({
        origin: [process.env.FRONTEND_URI],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // frontend pe cookies ye sab send karne ke liye
    })
)

// Using routes 
// app.use(userRouter);
app.use("/api/v1/users", userRouter);  // adding prefix url parameter
app.use("/api/v1/task", taskRouter);  // adding prefix url parameter


// Home Page
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Using our Custom Error Midleware
app.use(ErrorMiddleware);

