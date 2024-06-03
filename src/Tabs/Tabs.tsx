import React from 'react'

type Props = {
    elements: any[]
    setVal: (el: any) => void
    filterVal: string
    profile?: boolean
}

const Tabs = (props: Props) => {
  return (
    <div className={`items-center bg-gray3 px-1  py-1 rounded-full ${props.profile ? "flex" : "hidden lg:flex"}  w-fit `}>
        {props.elements.map((el) => ( 
          <div onClick={() => props.setVal(el)}  key={el} className={`transition-all ${props.filterVal === el ? " text-black1 font-medium bg-white rounded-full" : "text-gray1"} cursor-pointer text-sm  font-medium py-3 px-2 xxs:px-4`}>
            <p>{el}</p>
          </div>
        ))}
      </div>
  )
}

export default Tabs