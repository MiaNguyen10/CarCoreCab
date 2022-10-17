import { CircularProgress, ThemeProvider } from '@mui/material'
import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { RecoilRoot } from 'recoil'

import 'app/ioc/registry'
import { PermissionProvider } from 'app/middlewares/PermissionProvider'
import Router from './Router'
import theme from './theme'
import NotificationProvider from 'app/components/Dialog/NotificationProvider'

function App() {
  const { t } = useTranslation()

  return (
    <ThemeProvider theme={theme}>
      <PermissionProvider>
        <NotificationProvider width={338} height={131} desc={t('DIALOG_NOTIFICATION_AUTHENICATION_EXPIRED')}>
          <RecoilRoot>
            <Suspense fallback={<CircularProgress />}>
              <Router />
            </Suspense>
          </RecoilRoot>
        </NotificationProvider>
      </PermissionProvider>
    </ThemeProvider>
  )
}

export default App

