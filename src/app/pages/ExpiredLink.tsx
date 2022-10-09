import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Link, Typography } from '@mui/material'

import pages from 'app/config/pages'
import { CenterPage, FormHeader, RightBox } from 'app/components'

const ExpiredLink = () => {
  const { t } = useTranslation()

  return (
    <CenterPage>
      <FormHeader name="FORGOT_PASSWORD_TITLE" />
      <Typography>{t('FORGOT_PASSWORD_EXPIRED_LINK')}</Typography>
      <RightBox>
        <Link href={pages.forgotPassword}>{t('LOGIN_FORGOT_PASSWORD')}</Link>
      </RightBox>
    </CenterPage>
  )
}

export default ExpiredLink

