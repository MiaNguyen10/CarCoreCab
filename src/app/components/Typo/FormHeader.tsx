import * as React from 'react'

import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CenterBox } from 'app/components/Box'

interface IFormHeader {
  name: string
}

const StyledTypo = styled(Typography)({
  marginBottom: '32px',
})

const FormHeader = ({ name }: IFormHeader) => {
  const { t } = useTranslation()

  return (
    <CenterBox>
      <StyledTypo variant="h1">{t(name)}</StyledTypo>
    </CenterBox>
  )
}

export default FormHeader

