import { Typography } from '@mui/material'
import React from 'react'

interface ListTypoProps {
  desc: string
}
const ListTypo: React.FC<ListTypoProps> = ({ desc }) => {
  return (
    <>
      <Typography variant="h1" align="center" sx={{ margin: '40px' }}>
        {desc}
      </Typography>
    </>
  )
}

export default ListTypo

