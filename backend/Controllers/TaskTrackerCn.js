import catchAsync from '../Utils/catchAsync.js'
import handleError from '../Utils/handleError.js'
import TaskTracker from '../Models/TaskTrackerMd.js'
import ApiFeatures from '../Utils/apiFeatures.js'

export const addTask=catchAsync(async(req,res,next)=>{
    const task=await TaskTracker.create(req?.body)
    return res.status(201).json({
        success:true,
        data:task,
        message:'Task successfully added'
    })
})

export const updateTask=catchAsync(async(req,res,next)=>{
    const taskToUpdate=await TaskTracker.findByIdAndUpdate(req?.params.id,req?.body,{new:true,runValidators:true})
    return res.status(200).json({
        success:true,
        data:taskToUpdate,
        message:'Task successfully updated.'
    })
}) 

export const deleteTask=catchAsync(async(req,res,next)=>{
    const taskToDelete=await TaskTracker.findByIdAndDelete(req?.params.id)
    return res.status(200).json({
        success:true,
        data:taskToDelete,
        message:'Task successfully deleted.'
    })
})

export const listAllTasks=catchAsync(async(req,res,next)=>{
    const features=new ApiFeatures(TaskTracker,req?.query).filters().sort().limitFields().paginate()
    const allTasks=await features.model
    return res.status(200).json({
        success:true,
        data:allTasks
    })
})

export const doneTask=catchAsync(async(req,res,next)=>{
    const queryString={...req?.query,filters:{...req?.query?.filters,status:'done'}}
    const features=new ApiFeatures(TaskTracker,queryString).filters().sort().limitFields().paginate().populate()
    const doneTasks=await features.model
    return res.status(200).json({
        success:true,
        data:doneTasks
    })
})
export const inProgressTask=catchAsync(async(req,res,next)=>{
    const queryString={...req?.query,filters:{...req?.query?.filters,status:'in-progress'}}
    const features=new ApiFeatures(TaskTracker,queryString).filters().sort().limitFields().paginate().populate()
    const inProgressTask=await features.model
    return res.status(200).json({
        success:true,
        data:inProgressTask
    })
})
export const todoTask=catchAsync(async(req,res,next)=>{
    const queryString={...req?.query,filters:{...req?.query?.filters,status:'todo'}}
    const features=new ApiFeatures(TaskTracker,queryString).filters().sort().limitFields().paginate().populate()
    const todoTask=await features.model
    return res.status(200).json({
        success:true,
        data:todoTask
    })
})