import * as React from 'react'

import { Button, styled, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface IFormSubmitButton {
  name: string
}

const StyledButton = styled(Button)({
  marginLeft: 14,
})

const StyledTypo = styled(Typography)({
  fontWeight: 900,
  fontSize: 14,
})

const FormSubmitButton = ({ name }: IFormSubmitButton) => {
  const { t } = useTranslation()

  return (
    <StyledButton type="submit" variant="contained" color="primary">
      <StyledTypo>{t(name)}</StyledTypo>
    </StyledButton>
  )
}

export default FormSubmitButton

