"use client"
import Image from 'next/image'
import React from 'react'
import AuthImage from "/public/assets/auth-image.png"
import RegisterForm from '@/components/Forms/Register/RegisterForm'
import { useRouter } from 'next/navigation'
import CancelImage from "/public/assets/cancel.svg";

import Logo from "/public/assets/logo.svg";

type Props = {}

const RegisterPage = (props: Props) => {
  const router = useRouter()
  return (
    <div className="des:flex des:h-screen">
       <div className=" flex des:hidden  items-center justify-between px-4 xxs:px-6 pt-6">
        <div className="">
          <Image src={Logo} alt="logo-image" />
        </div>
        <div className="" onClick={() => router.push("/")}>
          <Image src={CancelImage} alt="cancel-image" />
        </div>
      </div>
      <div className=" hidden des:block absolute top-10 left-10 ">
        <Image src={Logo} alt="logo-image" />
      </div>
       <div 
       style={{
        backgroundImage: `url(${AuthImage.src})`
      }} className="  bg-cover bg-center h-screen hidden des:block w-[50%]">
        {/* <Image src={AuthImage} alt='auth-image' className='h-full w-full' /> */}
       </div>
       <div className="w-[90%] des:h-screen des:overflow-scroll mm:w-[65%] des:w-[50%] lg:max-w-[50rem] mx-auto relative">
        <RegisterForm />
       </div>
    </div>
  )
}

export default RegisterPage