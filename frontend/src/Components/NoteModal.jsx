import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import notify from '../Utils/notify';


export default function NoteModal({ handleShowNoteModal,handleNoteCounter }) {
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/task-tracker', {
        method: 'POST',
        headers: {
          'content-type': "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!data.success) {
        notify('error', data.message)
      } else {
        console.log(data);
        notify('success', data.message)
        handleShowNoteModal(false)
        handleNoteCounter()
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='fixed top-0 right-0 w-full h-[100vh] backdrop-blur-md bg-[#e8ded4]/60'>
      <form onSubmit={handleSubmit} className={'absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'}>

        <div className='w-fit h-fit bg-[#A3815C]  flex flex-col  items-center px-10 py-8 rounded-md gap-4'>
          <div className='absolute top-4 right-4 cursor-pointer' onClick={(e) => { handleShowNoteModal(false) }} >     <IoCloseSharp size={28} /> </div>

          <h3 className='text-2xl text-center'>Create New Note</h3>
          <label>
            Title:<br />
            <input id='title' onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })} type="text" className='outline-none border-0 rounded-md p-2 mt-2 ' placeholder='Enter your title' />
          </label>

          <textarea className='outline-none p-2 border-0 rounded-md w-full h-28' onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })} name="" id="description"></textarea>
          <div className='flex gap-6'>
            <label>
              <input name='status' onClick={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value='todo' type="radio" /> To Do<br />
            </label>
            <label>
              <input name='status' onClick={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value='done' type="radio" /> Done<br />
            </label>
            <label >
              <input name='status' onClick={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value='in-progress' type="radio" /> In progress<br />
            </label>

          </div>
          <button type='submit' className='bg-[#E9D7BF] w-fit rounded-md px-5 py-2'>Add to notes</button>
        </div>
      </form>
    </div>
  )
}
