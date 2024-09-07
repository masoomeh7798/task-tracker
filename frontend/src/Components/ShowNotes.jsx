import React, { useEffect, useState } from 'react'
import NoteModal from './NoteModal';
import Note from './Note';
import notify from '../Utils/notify';

export default function ShowNotes({isLogin,handleNotes,
  notes}) {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteCounter, setNoteCounter] = useState(0);
  const [items, setItems] = useState([]);
  const [isUpdatedDeleted, setisUpdatedDeleted] = useState();

  const handleIsUpdatedDeleted=()=>{
    setisUpdatedDeleted(!isUpdatedDeleted)
  }
  const handleShowNoteModal=(e)=>{
    setShowNoteModal(e)
  }
  const handleNoteCounter=()=>{
    setNoteCounter(noteCounter+1)
  }
  useEffect(() => {
    (async()=>{
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
    })()
    
  }, [noteCounter,isUpdatedDeleted]);
 
  useEffect(() => {
    setItems(notes.map((e,index)=>{
    return(<Note  handleIsUpdatedDeleted={handleIsUpdatedDeleted} key={index} title={e?.title} description={e?.description} status={e?.status} createdAt={e?.createdAt} updatedAt={e?.updatedAt} id={e?._id} />)
  }))
    
  }, [notes]);


  return (
    <>
    <div className='w-3/4 show-notes relative px-12'>
        <h1 className='text-center text-4xl py-12 text-yellow-950'>Note Pad</h1>
        {isLogin && <button onClick={(e)=>setShowNoteModal(true)} className='text-xl text-yellow-950 hover:scale-110 duration-500 fixed right-[30%] bottom-12 bg-[#E9D7BF] mt-4 w-fit rounded-md px-5 py-2'>Add Note</button>}
        <div className='flex gap-4 flex-wrap'>{items}</div>

    </div>
    {showNoteModal && <NoteModal handleShowNoteModal={handleShowNoteModal} handleNoteCounter={handleNoteCounter}/>}
     
    </>
  )
}
