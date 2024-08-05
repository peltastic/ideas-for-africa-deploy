import { Button, Tooltip } from '@mantine/core'
import React, { ReactNode } from 'react'

type Props = {
    label: string
    children: ReactNode
}

const ToolTipComponent = (props: Props) => {
  return (
    <Tooltip
      position="right"
      color='#332600'
      w={280}
      multiline
      transitionProps={{
        transition: 'fade-left',
        duration: 300
      }}
    //   opened
      label={props.label}
    >
        {props.children}
    </Tooltip>
  )
}

export default ToolTipComponent