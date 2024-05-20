"use client"
import React from 'react'
import AuthImage from "/public/assets/auth-image.png"
import Image from 'next/image'
import LoginForm from '@/components/Forms/Login/Login'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className="flex h-screen">
       <div className="w-[50%]">
        <Image src={AuthImage} alt='auth-image' />
       </div>
       <div className="w-[50%]">
        <LoginForm />
       </div>
    </div>
  )
}

export default LoginPage