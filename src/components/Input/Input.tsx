import React from 'react'

type Props = {
    class: string
    placeholder: string
    type?: string
    value?: any
    changed: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: Props) => {
  return (
    <input value={props.value} onChange={props.changed} className={props.class} type={props.class} placeholder={props.placeholder} />
  )
}

export default Input