"use client"
import { useEffect, useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation"
import Link from "next/link"
const Singin = () => {
  const router=useRouter();
  const [user, setUser]=useState({
    email:"",
    password:""
  });
  const[buttonDisabled, setButtonDisabled]=useState(false);
  const[loading, setLoading]=useState(false);
  const onSingin= async () => {
    try{
    setLoading(true)
    const responce= await axios.post("api/useres/singin", user)
    console.log("Sing success", responce.data)  
    router.push('/profile')
   } catch (error: any){
        console.log("Sing failed");
        toast.error(error.message)
    }
  }
    useEffect(() => {
    if(user.email.length > 0 && user.password.length){
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  })
  return (
    <div  className="flex flex-col bg-black text-white items-center justify-center
    min-h-screen py-2">
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
       <button onClick={onSingin}
      className=" p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600">
         {buttonDisabled ? "fill credensiale" : "Sign-in"} 
      </button>
      <Link href={'/singup'}> visit singup page</Link>
    </div>
  )
}

export default Singin