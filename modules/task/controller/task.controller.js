import AppError from "../../../utils/AppError.js";
import taskModel from "../models/task.model.js";

// create task 
const createTaskController = async (req, res, next)=>{
  try {
     const {date, time, ...rest} = req.body
     const newTask = await taskModel.create({
         ...rest,
         scheduledAt: new Date(`${date}T${time}:00+06:00`)
      })
  
      res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task: newTask
  });
  } catch (error) {
    next(error);
  }
}

// get all task?
const getAllTaskController = async (req, res, next)=>{
      try {
        const tasks = await taskModel.find()
        res.status(200).json({
          success:true,
          totalTasks: tasks.length,
          tasks
        })
      } catch (error) {
        next(error);
      }
}

// update task 
const updateTaskController = async (req, res, next)=>{
    try {
        const {date, time, ...rest} = req.body
        const {id} = req.params
        const existingTask = await taskModel.findById(id) 
        const updatedData = {...rest}

        if(date || time){
            if(!existingTask){
            throw new AppError("Task not found!", 404);
            return;
        }
           const existingDate = existingTask.scheduledAt.toLocaleDateString('en-CA', {timeZone: 'Asia/Dhaka'})
           const existingTime = existingTask.scheduledAt
                                .toLocaleTimeString('en-GB', 
                                    { timeZone: 'Asia/Dhaka',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false  })
            const newDate = date || existingDate;
            const newTime = time || existingTime;

            updatedData.scheduledAt = new Date(`${newDate}T${newTime}:00+06:00`)
        }
        if(!existingTask){
            throw new AppError("Task not found!", 404);
            return;
        }
        const updateData = await taskModel.findByIdAndUpdate(id, updatedData, {returnDocument: 'after', runValidators: true})
        res.status(201).json({
            success: true,
            message: 'Task updated successfully!',
            task: updateData
        })
    } catch (error) {
        next(error)
        
    }
}

// delete task 
const deleteTaskController = async (req, res, next)=>{
    try {
        const deletedTask = await taskModel.findByIdAndDelete(req.params.id)
        if(!deletedTask){
            throw new AppError("Task not found", 404)
        }
        res.status(200).json({
            success:true,
            message: "Task deleted successfully.",
            task: deletedTask
        })
    } catch (error) {
        next(error);
    }
}

export {createTaskController, getAllTaskController, updateTaskController, deleteTaskController} 