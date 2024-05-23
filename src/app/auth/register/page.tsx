"use client"
import Image from 'next/image'
import React from 'react'
import AuthImage from "/public/assets/auth-image.png"
import RegisterForm from '@/components/Forms/Register/RegisterForm'

type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <div className="flex h-screen">
       <div className="w-[50%]">
        <Image src={AuthImage} alt='auth-image' />
       </div>
       <div className="w-[50%] relative">
        <RegisterForm />
       </div>
    </div>
  )
}

export default RegisterPage