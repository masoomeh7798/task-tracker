import catchAsync from '../Utils/catchAsync.js'
import handleError from '../Utils/handleError.js'
import User from '../Models/UserMd.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register=catchAsync(async(req,res,next)=>{
    const {password=null,email=null,...others}=req?.body
    if(!email || !password){
        return next(new handleError('Please provide email and password',400))
    }
    const regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g
    if(regex.test(password)){
        return next(new handleError('Password isnt matched',400))
    }
    const hashPass=bcryptjs.hashSync(password,10)
    const user=await User.create({...others,password:hashPass,email})
    return res.status(200).json({
        success:true,
        message:'User successfully added.'
    })
})
export const login=catchAsync(async(req,res,next)=>{
     const {email=null,password=null}=req?.body
     if(!email || !password){
        return next(new handleError('Please provide email and password',400))
     }
     const user=await User.findOne({email})
     if(!user){
        return next(new handleError('Email or pass is incorrect',401))
     }
     const validPass=bcryptjs.compareSync(password,user.password)
     if(!validPass){
        return next(new handleError('Email or pass is incorrect',401))
     }
     const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET)
     return res.status(200).json({
        success:true,
        data:{
            token,
            user:{
                fullName:user?.fullName,
                email:user.email,
                id:user._id
            },
           
        },
         message:'login successfully'
     })
})