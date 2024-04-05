"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation' 
const Profile = () => {
  const router =useRouter();
  const [data, setData]= useState('nothing')
   
  const getUserDetails =async () =>{
    try{
      const res=await axios.post("/api/useres/me")
      console.log(res.data.data._id);
      setData(res.data.data._id)
    } catch(error: any){
      console.log(error.message)
      toast.error(error.message)
    }
    
  }
  const logout =async ()=>{
    try{
         await axios.get("/api/useres/logout")
         toast.success("logout sucesfull")
         router.push("/singin")
    } catch (error: any){
      console.log(error.message)
      toast.error(error.message)
    }
  }
  return (
    <div className='bg-black min-h-screen text-white 
    justify-center py-2 flex flex-col items-center'>
        <h1>Profile Page</h1>
         <hr />
         <h2>{data === 'nothing' ? "Nothing" : 
         <Link href={`/profile/${data}`}>{data}</Link>}</h2>      
         <hr />

         <button className='bg-blue-500 mt-4 hover:bg-blue-700
         text-white font-bold py-2 px-4 rounded' 
         onClick={logout}>
           logout
         </button>

         <button className='bg-green-500 mt-4 hover:bg-green-700
         text-white font-bold py-2 px-4 rounded' 
         onClick={getUserDetails}>
           Get User Details
         </button>
      </div>
  )
}

export default Profile