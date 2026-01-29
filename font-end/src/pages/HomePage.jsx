import React ,{useEffect, useState}  from 'react'
import { NavBar } from '../componets/NavBar'
import { RateLimiteUI } from '../componets/RateLimiteUI';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NoteCard } from '../componets/NoteCard';

//axiso
import AxiosInstance from '../lib/axios';
import { NotesNotFound } from '../componets/NotesNotFound';
import { LoaderIcon } from 'lucide-react';

export const HomePage = () => {

  const [isRateLimited,setIsReteLimited] = useState(false);
    const [notes,setNotes] = useState([]);
      const [loading,setLoading] = useState(true);

      useEffect(()=>{
        const fetchNotes = async ()=>{
          try{
            const res = await AxiosInstance.get('/notes');
              const data = await res.data;
              setNotes(data);
              setIsReteLimited(false)
          }catch(error){
            console.log("Error fetching notes");
            if(error.response?.status === 429){
              setIsReteLimited(true);
            }else{
              toast.error("Failed to load toast")
            }
          }finally{
            setLoading(false)
          }
        }

        fetchNotes()
      },[])
  
  return (
    <div className='min-h-screen'>
      <NavBar />

      {isRateLimited && <RateLimiteUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
         {loading && <div className='min-h-[80%] bg-base-200 flex items-center  justify-center'><LoaderIcon className='animate-spin size-10' /></div>}

          {notes.length === 0 && !isRateLimited && <NotesNotFound />}
         {notes.length > 0 && !isRateLimited && (
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
             {notes.map((note)=> (
               <NoteCard note={note} setNotes={setNotes} ket={note._id} />
             ))}
           </div>
         )}
      </div>
    </div>
  )
}
