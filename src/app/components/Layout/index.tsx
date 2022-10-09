import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import { ColumnBox, Footer } from 'app/components'
import Header from 'app/components/Header/Header'

const Layout = () => {
  return (
    <ColumnBox>
      <Header />
      <Box component="main" sx={{ marginTop: '80px', marginBottom: '60px' }}>
        <Outlet />
      </Box>
      <Footer />
    </ColumnBox>
  )
}

export default Layout

