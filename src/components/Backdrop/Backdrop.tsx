import React from 'react'

type Props = {
    clicked?: () => void
}

const Backdrop = (props: Props) => {
  return (
    <div onClick={props.clicked} className='bg-[#00000070] w-full h-screen backdrop-blur-sm  z-[100] fixed top-0 left-0'></div>
  )
}

export default Backdrop