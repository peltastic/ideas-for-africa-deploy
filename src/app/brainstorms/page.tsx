import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "/public/assets/logo.svg";
import ProfileMenu from '@/components/ProfileMenu/ProfileMenu';
import BrainstormFeed from '@/components/Brainstorms/BrainstormFeed';

type Props = {}

const Brainstorms = (props: Props) => {
  return (
   <div className="">
        <nav className="w-full py-4 px-6">
        <div className="flex items-center ">
          <div className="cursor-pointer mr-auto">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" />
            </Link>
          </div>
          <ProfileMenu />
        </div>
      </nav>
      <BrainstormFeed />
   </div>
  )
}

export default Brainstorms