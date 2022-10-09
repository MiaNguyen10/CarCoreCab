import { styled, Typography } from '@mui/material'
import React from 'react'

interface LabelTypoProps {
  desc: string
}
const LabelField = styled('div')({
  display: 'flex',
  flexDirection: 'row',
})

const RequiredMark = () => {
  return <span style={{ color: 'red' }}>*</span>
}
const LabelTypo: React.FC<LabelTypoProps> = ({ desc }) => {
  return (
    <>
      <LabelField>
        <Typography variant="h4" sx={{ marginBottom: '5px' }}>
          {desc} <RequiredMark />
        </Typography>
      </LabelField>
    </>
  )
}

export default LabelTypo

