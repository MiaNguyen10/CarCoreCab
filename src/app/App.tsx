import React, { Suspense } from 'react'
import { CircularProgress, ThemeProvider } from '@mui/material'
import { PermissionProvider } from 'app/middlewares/PermissionProvider'
import { RecoilRoot } from 'recoil'

import 'app/ioc/registry'

import Router from './Router'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PermissionProvider>
        <RecoilRoot>
          <Suspense fallback={<CircularProgress />}>
            <Router />
          </Suspense>
        </RecoilRoot>
      </PermissionProvider>
    </ThemeProvider>
  )
}

export default App

