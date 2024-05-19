import React from 'react'

type Props = {
    class: string
    placeholder: string
}

const Input = (props: Props) => {
  return (
    <input className={props.class} type='' placeholder={props.placeholder} />
  )
}

export default Input