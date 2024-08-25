import Link from 'next/link'
import React from 'react'
import Logo from "/public/assets/logo.svg";
import Image from 'next/image';
import ProfileMenu from '@/components/ProfileMenu/ProfileMenu';
import AllIdeas from '@/components/AllIdeas/AllIdeas';

type Props = {}

const AllIdeasPage = (props: Props) => {
  return (
    <div>
        <nav className='w-full py-4 px-2 sm:px-8'>
         <div className="flex items-center">
            <div className="cursor-pointer mr-auto">
                <Link href={"/"}>
                    <Image src={Logo} alt="logo" />
                </Link>
            </div>
            <ProfileMenu />
         </div>
        </nav>
        <AllIdeas />
    </div>
  )
}

export default AllIdeasPage