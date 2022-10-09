import React from 'react'
import { Container, styled } from '@mui/material'
import { ColumnBox } from 'app/components'
import { IChildrenProps } from 'app/components/interfaces'

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '38px',
})

const CenterPage = ({ children }: IChildrenProps) => {
  return (
    <StyledContainer>
      <ColumnBox>{children}</ColumnBox>
    </StyledContainer>
  )
}

export default CenterPage

