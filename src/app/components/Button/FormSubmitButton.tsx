import * as React from 'react'

import { Button, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface IFormSubmitButton {
  name: string
}

const StyledButton = styled(Button)({
  marginLeft: 14,
  minWidth: '94px',
})

const FormSubmitButton = ({ name }: IFormSubmitButton) => {
  const { t } = useTranslation()

  return (
    <StyledButton type="submit" variant="contained">
      {t(name)}
    </StyledButton>
  )
}

export default FormSubmitButton

