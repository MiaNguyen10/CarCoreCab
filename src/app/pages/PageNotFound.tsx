import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'

import { CenterBox, CenterPage } from 'app/components'

const PageNotFound = () => {
  const { t } = useTranslation()

  return (
    <CenterPage>
      <CenterBox>
        <Typography sx={{ fontSize: 200, fontWeight: 400, color: '#00A950' }}>{t('PAGE_NOT_FOUND_CODE')}</Typography>
      </CenterBox>

      <CenterBox>
        <Typography sx={{ fontSize: 60, fontWeight: 400, color: '#00A950' }}>{t('PAGE_NOT_FOUND_TITLE')}</Typography>
      </CenterBox>

      <CenterBox>
        <Typography sx={{ fontSize: 32, fontWeight: 600 }}>{t('PAGE_NOT_FOUND_DESCRIPTION')}</Typography>
      </CenterBox>
    </CenterPage>
  )
}

export default PageNotFound

