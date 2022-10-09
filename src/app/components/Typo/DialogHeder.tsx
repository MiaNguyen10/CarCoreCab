import * as React from 'react'

import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import { IChildrenProps } from 'app/components/interfaces'

const StyledTypo = styled(Typography)({
  marginTop: 16,
  color: '#333333',
})

const DialogHeader = ({ children }: IChildrenProps) => {
  return <StyledTypo variant="h5">{children}</StyledTypo>
}

export default DialogHeader

