import Navbar from '@/components/Navbar/Navbar'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import ProfileView from '@/components/ProfileView/ProfileView'
import React from 'react'

type Props = {}

const ProfileViewPage = (props: Props) => {
  return (
    <div className="">
        <Navbar />
        <div className="px-20">
        <ProfileHeader />
        <ProfileView />
        </div>
    </div>
  )
}

export default ProfileViewPage