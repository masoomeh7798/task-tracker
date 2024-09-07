import express from 'express'
import { addTask, deleteTask, doneTask, inProgressTask, listAllTasks, todoTask, updateTask } from '../Controllers/TaskTrackerCn.js'
import isLogin from '../Middleware/isLogin.js'

const taskRouter=express.Router()

taskRouter.route('/').post(isLogin,addTask).get(isLogin,listAllTasks)
taskRouter.route('/:id').patch(isLogin,updateTask).delete(isLogin,deleteTask)
taskRouter.route('/done-task').get(isLogin,doneTask)
taskRouter.route('/in-progress-task').get(isLogin,inProgressTask)
taskRouter.route('/todo-task').get(isLogin,todoTask)

export default taskRouter