import React, { useState } from 'react'
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Sidebar({isLogin,handleIsLogin,handleNotes}) {
const [showLoginModal, setShowLoginModal] = useState(false);
const [showRegisterModal, setShowRegisterModal] = useState(false);
const handleLoginModal=(e)=>setShowLoginModal(e)
const handleRegisterModal=(e)=>setShowRegisterModal(e)

const handleAllNotes=async()=>{
    try {
        const res = await fetch('http://localhost:5000/api/task-tracker', {
          method: 'GET',
          headers: {
            'content-type': "application/json",
            authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
        const data = await res.json()
        if (!data.success) {
          notify('error', data.message)
        } else {
          console.log(data);
          handleNotes(data?.data)
        }
  
      } catch (error) {
        console.log(error);
      }
}

const handleMidDone=async()=>{
        try {
            const res = await fetch('http://localhost:5000/api/task-tracker/done-task', {
              method: 'GET',
              headers: {
                'content-type': "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
              },
            })
            const data = await res.json()
            if (!data.success) {
              notify('error', data.message)
            } else {
              console.log(data);
              handleNotes(data?.data)
            }
      
          } catch (error) {
            console.log(error);
          }
    
        }
const handleMidTodo=async()=>{

        try {
            const res = await fetch('http://localhost:5000/api/task-tracker/todo-task', {
              method: 'GET',
              headers: {
                'content-type': "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
              },
            })
            const data = await res.json()
            if (!data.success) {
              notify('error', data.message)
            } else {
              console.log(data);
              handleNotes(data?.data)
            }
      
          } catch (error) {
            console.log(error);
          }
    
        }
const handleMidInProgress=async()=>{

        try {
            const res = await fetch('http://localhost:5000/api/task-tracker/in-progress-task', {
              method: 'GET',
              headers: {
                'content-type': "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
              },
            })
            const data = await res.json()
            if (!data.success) {
              notify('error', data.message)
            } else {
              console.log(data);
              handleNotes(data?.data)
            }
      
          } catch (error) {
            console.log(error);
          }
    
        }
  return (
    <>
    <div className='w-1/4 flex flex-col py-2 sidebar '>
        <div className='py-16'>
        <h2 className='text-center text-2xl mb-4 text-yellow-950'>Join</h2>
            <ul>
                <li onClick={(e)=>setShowLoginModal(true)} className='mb-[1px] cursor-pointer leading-[56px] bg-[#A3815C] text-xl text-center text-yellow-950' >Login</li>
                <li onClick={(e)=>setShowRegisterModal(true)} className='mb-[1px] cursor-pointer leading-[56px] bg-[#A3815C] text-xl text-center text-yellow-950' >Register</li>
            </ul>
        </div>
        {isLogin && <div>
        <h2 className='text-center text-2xl mb-4 text-yellow-950'>Notes</h2>
            <ul>
                <li className='mb-[1px] cursor-pointer leading-[56px] bg-[#A3815C] text-xl text-center text-yellow-950' onClick={handleAllNotes} >My Notes</li>
                <li className='mb-[1px] cursor-pointer leading-[56px] bg-[#A3815C] text-xl text-center text-yellow-950' onClick={handleMidDone} >I have Done.</li>
                <li className='mb-[1px] cursor-pointer leading-[56px] bg-[#A3815C] text-xl text-center text-yellow-950' onClick={handleMidTodo} >I Want to do.</li>
                <li className='mb-[1px] cursor-pointer leading-[56px] bg-[#A3815C] text-xl text-center text-yellow-950' onClick={handleMidInProgress} >I'm doing.</li>
            </ul>
        </div> }

    
    </div>
    {showLoginModal && <LoginModal handleIsLogin={handleIsLogin} handleLoginModal={handleLoginModal} handleRegisterModal={handleRegisterModal} /> }
    {showRegisterModal && <RegisterModal handleLoginModal={handleLoginModal} handleRegisterModal={handleRegisterModal}/>}

    </>
  )
}
