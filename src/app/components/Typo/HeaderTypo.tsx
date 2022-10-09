import { Typography } from '@mui/material'
import React from 'react'

interface HeaderTypoProps {
  header: string
}
const HeaderTypo: React.FC<HeaderTypoProps> = ({ header }) => {
  return (
    <>
      <Typography variant="h1" align="center" sx={{ margin: '40px 0 10px' }}>
        {header}
      </Typography>
    </>
  )
}

export default HeaderTypo

