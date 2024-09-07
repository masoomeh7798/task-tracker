import express from 'express'
import catchError from "./Utils/catchError.js"
import handleError from './Utils/handleError.js'
import cors from 'cors'
import morgan from 'morgan'
import {fileURLToPath} from 'url'
import path from 'path'
import taskRouter from './Routes/TaskTracker.js'
import authRouter from './Routes/Auth.js'


const __filename=fileURLToPath(import.meta.url)
export const __dirname=path.dirname(__filename)

const app=express()
app.use(cors())
app.use(express.static('Public'))
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/task-tracker',taskRouter)

app.use('*',(req,res,next)=>{
    return next(new handleError('Route not found',401))
})
app.use(catchError)
export default app