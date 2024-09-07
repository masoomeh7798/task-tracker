import React from 'react'
import { useState } from 'react'
import ShowNotes from './ShowNotes';
import Sidebar from './Sidebar';

export default function Home() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('token') ? true : false);
  const [notes, setNotes] = useState([]);

  const handleNotes=(e)=>{
    setNotes(e)
  }

    const handleIsLogin=(e)=>{
      setIsLogin(e)
    }

   
  return (
    <>
    <div className='flex w-full bg-[rgb(238,211,166)] min-h-[100vh]'><ShowNotes handleNotes={handleNotes} notes={notes} isLogin={isLogin}/><Sidebar handleNotes={handleNotes} isLogin={isLogin} handleIsLogin={handleIsLogin}  /></div>
    </>
  )
}
