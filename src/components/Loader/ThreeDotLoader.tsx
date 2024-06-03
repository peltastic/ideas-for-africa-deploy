import React from 'react'

type Props = {}

const ThreeDotLoader = (props: Props) => {
  return (
    
    <div className="flex gap-2">
    <div className="w-5 h-5 rounded-full animate-pulse bg-primary-light"></div>
    <div className="w-5 h-5 rounded-full animate-pulse bg-primary-light"></div>
    <div className="w-5 h-5 rounded-full animate-pulse bg-primary-light"></div>
</div>
  )
}

export default ThreeDotLoader