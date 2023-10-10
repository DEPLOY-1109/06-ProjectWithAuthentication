import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
    try {
        // res.send('New Task is Here !');

        const { title, description } = req.body;

        // const task = new Task({ title });
        // await task.save();
        // or
        await Task.create({ title, description, user: req.user });

        res.status(201).json({
            success: true,
            message: "Task added Successfully !",
        })
    } catch (error) {
        next(error);
    }
}

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;

        const tasks = await Task.find({ user: userid });

        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        // or const task = await Task.findById(req.params.id);

        // console.log(!task);
        if (!task) {
            // return next(new Error("Invalid Id $@"));
            return next(new ErrorHandler("Invalid Id $@", 404));
        }

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Toggle Updated",
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
try {
    const task = await Task.findById(req.params.id);

    if (!task) {
        // return next(new Error("Invalid ID @"));
        // return next(new Error());   // Internal server err msg will show
        return next(new ErrorHandler("Task Not Found or Invalid ID", 404));
    }

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task Deleted",
    })

} catch (error) {
    next(error);
}
}

