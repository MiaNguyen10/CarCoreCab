import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Typography } from '@mui/material'
import useLanguage from 'cores/services/language'

interface ILangButtonProps {
  language: string
}

export const StyledLangTypography = styled(Typography)({
  padding: '2px',
  fontSize: '20px',
  fontWeight: '400',
  cursor: 'pointer',
  color: '#FFFFFF',
  textTransform: 'uppercase',
})

const LangButton = ({ language }: ILangButtonProps) => {
  const { i18n } = useTranslation()
  const { currentLanguage, setLanguageState } = useLanguage()

  const setLanguage = (): void => {
    i18n.changeLanguage(language)
    setLanguageState({ language })
  }

  return (
    <StyledLangTypography
      sx={{
        fontWeight: currentLanguage === language ? 700 : 400,
      }}
      onClick={() => setLanguage()}
    >
      {language}
    </StyledLangTypography>
  )
}

export default LangButton

