import axios from 'axios';
import { ArrowLeftCircleIcon, ArrowLeftIcon } from 'lucide-react';
import React, {useState,useEffect} from 'react'
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router';

//axios
import AxiosInstance from '../lib/axios';


export const CreatePage = () => {
   const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
     const [loading,setLoading] = useState(false);

      const navigate = useNavigate();

       const handleSubmit = async (e)=>{
         e.preventDefault();

         if(!title.trim() || !content.trim()){
          return toast.error("All fields are required")
         }

         setLoading(true)

         try{
           const res = await AxiosInstance.post('/notes',{title,content});
            toast.success("Note created successfully!");
            navigate("/");
         }catch(error){
            console.error("Error to create note",error);
            if(error.response?.status === 429){
              return toast.error("Slow down !, you're creating notes too fast",{
                duration:4000,
                icon:"⚠️"
              })
            }else{
              toast.error("Failed to create note")
            }
         }finally{
          setLoading(false);
         }
       }

     
  
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto'>
            <Link to={"/"} className='btn btn-ghost mb-6'>
              <ArrowLeftIcon className='size-5' />
              Back to notes
            </Link>

            <div className='card bg-base-100'>
              <div className='card-body'>
                <h2 className="card-tile text-2xl mb-4">Create new Note</h2>
                <form onSubmit={handleSubmit}>
                  <div className='form-control mb-4'>
                    <label className='label'>
                      <span className='label-text'>Title</span>
                    </label>
                    <input type="text" placeholder='Note Tile'
                    className='input input-bordered'
                    onChange={(e)=> setTitle(e.target.value)}
                    />
                  </div>

                  <div className='form-control mb-4'>
                    <label className='label'>
                      <span className='label-text'>Title</span>
                    </label>
                    <textarea type="text" placeholder='Write your note here...'
                    className='textarea textarea-bordered h-32 resize-none'
                    onChange={(e)=> setContent(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="card-action justify-end">
                    <button type='submit' className='btn btn-primary' disabled={loading}>
                      {loading ? <div className='flex items-center justify-center gap-4'><span className='loading loading-spinner'></span> Creating...</div>  : "Create"}
                    </button>
                  </div>
                  
                  
                </form>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
