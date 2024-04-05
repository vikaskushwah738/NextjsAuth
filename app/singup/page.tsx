"use client"
import { useEffect, useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation"
import Link from "next/link"
const Singup = () => {
  const router=useRouter()
  const [user, setUser]=useState({
    email:"",
    password:"",
    username:""
  });
  const[buttonDisabled, setButtonEnable]=useState(false);
  const[loading, setLoading]=useState(false);
  const onSingup= async () => {
    try{
    setLoading(true)
    const responce= await axios.post("api/useres/singup", user)
    console.log("Singup success", responce.data)  
    router.push('/singin')
   } catch (error: any){
        console.log("Singup failed");
        toast.error(error.message)
    }
  }
  useEffect(() =>{
    if(user.email.length > 0 && user.password.length && user.username.length >0){
        setButtonEnable(false);
    } else {
        setButtonEnable(true);
    }
  })
      return (
    <div className="flex flex-col bg-black text-white items-center justify-center
    min-h-screen py-2"> 
    <h1> {loading ? "Processing" : "Sing-up"} </h1>
     <hr />
     <label htmlFor="username">username</label>
     <input
     className="p-2 rounded-lg border-gray-300 border mb-4 text-black
     focus:outline-none focus:border-gray-600"
     type="text"
     value={user.username}
     placeholder="username"
     onChange={(e) => setUser({...user, username: e.target.value })} />
     
     <label htmlFor="email">E-mail</label>
     <input
     className="p-2 rounded-lg border-gray-300 border mb-4 text-black
     focus:outline-none focus:border-gray-600"
     type="email"
     value={user.email}
     placeholder="email"
     onChange={(e) => setUser({...user, email: e.target.value })} />
     
     <label htmlFor="password">Password</label>
     <input
     className=" p-2 rounded-lg border-gray-300 border mb-4 text-black
     focus:outline-none focus:border-gray-600"
     type="password"
     value={user.password}
     placeholder="password"
     onChange={(e) => setUser({...user, password: e.target.value })} />
      <button onClick={onSingup}
      className=" p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600">
        {buttonDisabled ? "No singup" : "Signup"}
      </button>
      <Link href={'/singin'}> visit singin page</Link>
    </div>
  )
}

export default Singup