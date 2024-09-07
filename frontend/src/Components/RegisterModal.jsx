import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import notify from '../Utils/notify'

export default function RegisterModal({handleLoginModal,
    handleRegisterModal}) {
        const [formData, setFormData] = useState({});
        const handleSubmit=async(e)=>{
            e.preventDefault()
            try {
                const res=await fetch('http://localhost:5000/api/auth/register',{
                    method:'POST',
                    headers:{
                        'content-type':"application/json"
                    },
                    body:JSON.stringify(formData)
                })
                const data=await res.json()

                if(!data.success){
                    notify('error',data.message)
                }else{
                    notify('success',data.message)
                    handleRegisterModal(false)
                    handleLoginModal(true)
                }
                
            } catch (error) {
               console.log(error); 
            }
        }
  return (
        <div className='fixed top-0 right-0 w-full h-[100vh] backdrop-blur-md bg-[#e8ded4]/60'>
      <form onSubmit={handleSubmit} className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' >
      <div className='w-fit h-fit bg-[#A3815C]  flex flex-col  items-center px-10 py-8 rounded-md gap-4'>
        <div className='absolute top-4 right-4 cursor-pointer' onClick={(e)=>handleRegisterModal(false)}><IoCloseSharp size={28} /> </div>
        <h3 className='text-2xl text-center'>Register Form</h3>
        <label>
          Full name:<br/>
          <input id='fullName' onChange={(e)=>setFormData({...formData,[e.target.id]:e.target.value})} type="text" className='outline-none border-0 rounded-md p-2 mt-2' placeholder='Enter your name' />
        </label>
        <label>
          Email:<br/>
          <input id='email' onChange={(e)=>setFormData({...formData,[e.target.id]:e.target.value})} type="email" className='outline-none border-0 rounded-md p-2 mt-2' placeholder='Enter your email' />
        </label>
        <label>
          Password:<br/>
          <input id='password' onChange={(e)=>setFormData({...formData,[e.target.id]:e.target.value})} type="text" className='outline-none border-0 rounded-md p-2 mt-2' placeholder='Enter your password' />
        </label>
        <button type='submit' className='bg-[#E9D7BF] mt-4 w-fit rounded-md px-5 py-2'>Create Account</button>
        <h5 className='text-sm'>Don't you have an account?<a className='text-white/70 cursor-pointer' onClick={(e)=>{handleLoginModal(true);handleRegisterModal(false)}}>   Login</a></h5>
      </div>
      </form>
      </div>
  )
}
