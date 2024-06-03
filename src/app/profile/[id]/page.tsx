
import Navbar from '@/components/Navbar/Navbar'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import ProfileView from '@/components/ProfileView/ProfileView'
import React, { useState } from 'react'

type Props = {}

const ProfileViewPage = (props: Props) => {
  // const [edit, setEdit] = useState<boolean>()
  // const setEditHandler = (param: boolean) {
  //   setEdit(param)
  // }
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