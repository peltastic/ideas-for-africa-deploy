import React from 'react'

type Props = {}

const Spinner = (props: Props) => {
  return (
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
}

export default Spinner