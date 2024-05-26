import Image from 'next/image'
import React from 'react'
import AvatarLarge from "/public/assets/avatar-large.png";
import ProfileSvg from "/public/assets/profile-svg.svg"

type Props = {}

const ProfileHeader = (props: Props) => {
  return (
    <div className='relative overflow-hidden bg-gradient-to-b py-6 rounded-xl mt-9 px-10 from-primary-light to-primary'>
         <div className="flex items-center ">
            <div className="mr-4">
              <Image src={AvatarLarge} alt="avatar" />
            </div>
            <div className="text-xs mr-auto text-white ">
              <p className="font-bold text-2xl mb-1">Demilade Odetara</p>
              <p className="leading-5 text-white text-[0.9rem]">demi@ictnet.com • Created Feb 23, 2024</p>
            </div>
          </div>
          <div className="absolute right-0 top-0">

          <Image src={ProfileSvg} alt='profile-svg' />
          </div>
    </div>
  )
}

export default ProfileHeader