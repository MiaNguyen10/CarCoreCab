import { InputLabel, InputLabelProps, Typography } from '@mui/material'
import React from 'react'

export interface LabelTypoProps extends InputLabelProps {
  desc: string
  required?: boolean
}

export const RequiredMark = () => {
  return <span style={{ color: 'red' }}> *</span>
}

const LabelTypo: React.FC<LabelTypoProps> = ({ desc, required, ...rest }: LabelTypoProps) => {
  return (
    <InputLabel {...rest} sx={{ margin: '4px 0px' }}>
      <Typography variant="h4">
        {desc}
        {required && <RequiredMark />}
      </Typography>
    </InputLabel>
  )
}

export default LabelTypo

