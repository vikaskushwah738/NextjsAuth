'use client'
import React from 'react'

const UserProfile = ({params} : any) => {
  return (
    <div  className='bg-black min-h-screen text-white 
    justify-center py-2 flex flex-col items-center'>
        <h1 className='pb-5'>Profile Page</h1>
        <h2 className='p-3 bg-yellow-500 rounded
        text-black'> {params.id}</h2>
    </div>
  )
}

export default UserProfile