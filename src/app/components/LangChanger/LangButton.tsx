import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Typography } from '@mui/material'
import useLanguage from 'cores/services/language'

interface ILangButtonProps {
  language: string
}

const StyledButton = styled(Typography)({
  padding: '2px',
  fontSize: '20px',
  fontWeight: '400',
  cursor: 'pointer',
  textTransform: 'uppercase',
})

const LangButton = ({ language } : ILangButtonProps) => {
  const { i18n } = useTranslation()
  const { currentLanguage, setLanguageState } = useLanguage()

  const setLanguage = (): void => {
    i18n.changeLanguage(language)
    setLanguageState({ language })
  }

  return (
    <StyledButton
      sx={{
        fontWeight: currentLanguage === language ? 700 : 400,
      }}
      onClick={() => setLanguage()}
    >{ language }</StyledButton>
  )
}

export default LangButton
