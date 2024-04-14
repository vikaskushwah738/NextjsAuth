import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
connect()
export async function POST(request: NextRequest){
   try{
       const reqBody=await request.json()
       const {token} =reqBody
       console.log(token);
       const user=  await User.findOne({
        verifyToken: token,
        verifyTokenEpiry: {$gt: Date.now()} })

        if(!user){
            return NextResponse.json({error:"Invalid Token"},
                {status:400})
        }
        console.log(user)
        user.isVarified =true
        user.verifyToken= undefined
        user.verifyTokenEpiry= undefined

        await user.save()

        return NextResponse.json(
            {message: "Eamil verified sucessfully",
            sucsess:true
         }, {status:500})
   } catch (error :any){
      return NextResponse.json({error: error.message},
      {status:500})
   } 
}