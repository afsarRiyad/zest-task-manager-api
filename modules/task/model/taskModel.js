import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    note:{
        type:String,
        maxlength:600
    },
    category:{
        type:String,
    },
    priority:{
        type:String,
        enum:[ "high", "medium", "low"],
        default:"medium"
    },
   scheduledAt:{
        type:Date,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
}, {timestamps:true})

const taskModel = mongoose.model('Task', taskSchema)

export default taskModel;