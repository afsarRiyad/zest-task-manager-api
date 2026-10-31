import taskModel from "../model/taskModel.js";
import validate from "../../../middleware/validate.js";
import express from 'express'
import taskSchema, { updateTaskSchema } from "../schemas/taskSchema.js";
import AppError from "../../../utils/AppError.js";

const router = express.Router()

// create task route 

router.post('/task', validate(taskSchema), async (req, res)=>{
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
})

// get all task route 

router.get('/all-task', async (req, res, next)=>{
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
})
 
//  task update route 

router.patch('/update/task/:id',validate(updateTaskSchema), async (req, res, next)=>{
    try {
          const {date, time, ...rest} = req.body
          
          const existingTask = await taskModel.findById(req.params.id)
          const updateData = {...rest}
          if(date || time){
            if(!existingTask){
                throw new AppError('Task not found.', 404)
            }
            const existingDate = existingTask.scheduledAt
                                 .toLocaleDateString("en-CA", {timezone: "Asia/Dhaka"})
            const existingTime = existingTask.scheduledAt
                                  .toLocaleTimeString("en-GB", {
                                   timeZone: "Asia/Dhaka",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                    });
            const finalDate = date || existingDate
            const finalTime = time || existingTime

            updateData.scheduledAt = new Date(`${finalDate}T${finalTime}:00+06:00`)
            
          }

         const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, updateData,{
          returnDocument: 'after',
          runValidators: true
        })
         if(!updatedTask){
           throw new AppError("Task not found", 404)
         }
         res.status(200).json({
            success:true,
            message: "Task updated successfully.",
            task: updatedTask
         })
      } catch (error) {
        next(error);
      }       
})

// task delete route 

router.delete('/delete/task/:id', async (req, res, next)=>{
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
})

export default router;