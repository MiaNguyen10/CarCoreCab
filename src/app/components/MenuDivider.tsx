import * as React from 'react'
import { Divider } from '@mui/material'

interface IMenuDividerProps {
  height: string
}

const MenuDivider = ({ height }: IMenuDividerProps) => {
  return <Divider flexItem orientation="vertical" sx={{
    marginLeft: '10px',
    marginRight: '10px',
    height,
  }} />
}

export default MenuDivider
