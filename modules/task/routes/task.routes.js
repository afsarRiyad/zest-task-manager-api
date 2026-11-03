import validate from "../../../middleware/validate.js";
import express from 'express'
import taskSchema, { updateTaskSchema } from "../schemas/task.schema.js";
import { createTaskController, deleteTaskController, getAllTaskController, updateTaskController } from "../controller/task.controller.js";

const router = express.Router()

// create task route 
router.post('/create/task', validate(taskSchema), createTaskController)

// get all task route 
router.get('/all-task', getAllTaskController )
 
//  task update route 
router.patch('/update/task/:id',validate(updateTaskSchema), updateTaskController )

// task delete route 
router.delete('/delete/task/:id', deleteTaskController)

export default router;