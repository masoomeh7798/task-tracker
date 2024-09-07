import mongoose from "mongoose";

const taskTrackerSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'description is required']  
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    status:{
        type:String,
        enum:['todo','done','in-progress'],
        default:'todo',
    }

},{timestamps:true})

const TaskTracker=mongoose.model('TaskTracker',taskTrackerSchema)
export default TaskTracker