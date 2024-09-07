import React, { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import notify from '../Utils/notify';
import { IoCloseSharp } from "react-icons/io5";


export default function Note({ title,
  description,
  status,
  createdAt,
  updatedAt, id, handleIsUpdatedDeleted }) {
  const [updateMode, setUpdateMode] = useState(false);
  const [formData, setFormData] = useState({});


  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/task-tracker/${id}`, {
        method: 'DELETE',
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
        notify('success', data.message)
        handleIsUpdatedDeleted()
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:5000/api/task-tracker/${id}`, {
        method: 'PATCH',
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
        handleIsUpdatedDeleted()
        setUpdateMode(false)
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (

    updateMode ? <div className='z-50 fixed top-0 right-0 w-full h-[100vh] backdrop-blur-md bg-[#e8ded4]/60'>
      <form onSubmit={handleUpdate} className={'absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'}>

        <div className='w-fit h-fit bg-[#A3815C]  flex flex-col  items-center px-10 py-8 rounded-md gap-4'>
          <div className='absolute top-4 right-4 cursor-pointer' onClick={(e) => { setUpdateMode(false) }} >     <IoCloseSharp size={28} /> </div>

          <h3 className='text-2xl text-center'>Update Note</h3>
          <label>
            <input value={formData.title || title} id='title' onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })} type="text" className='outline-none border-0 rounded-md p-2 mt-2 ' placeholder='Enter your title' />
          </label>

          <textarea value={formData.description || description} className='outline-none p-2 border-0 rounded-md w-full h-28' onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })} name="" id="description"></textarea>
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
          <button type='submit' className='bg-[#E9D7BF] w-fit rounded-md px-5 py-2'>Change</button>
        </div>
      </form>
    </div>

      :

      <div className='w-[400px] h-[300px] bg-[#A3815C]  flex flex-col  relative px-10 py-4 rounded-md gap-2'>
        <div className='cursor-pointer absolute top-5 left-10' onClick={handleDelete}><MdDeleteForever size={28} /></div>
        <div className='cursor-pointer absolute top-5 right-10'><FaEdit onClick={(e) => { setUpdateMode(true) }} size={28} /></div>

        <h3 className='text-2xl text-center mb-2'>{title}</h3>
        <div className='bg-[#EBD3A5] p-2 rounded-md w-full h-1/2'>{description}</div>
        <p className='m-0 '>Status: {status}</p>
        <p className='m-0 '>Created at: {createdAt}</p>
        <p className='m-0 '>Updated at: {updatedAt}</p>
      </div>

  )
}
