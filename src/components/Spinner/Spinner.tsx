import React from 'react'

type Props = {
  dark?: boolean
}

const Spinner = (props: Props) => {
  return (
    <div className={`lds-ring ${props.dark ? "text-black" : "text-white"} `}><div></div><div></div><div></div><div></div></div>
  )
}

export default Spinner