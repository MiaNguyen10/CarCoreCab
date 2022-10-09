import AddIcon from '@mui/icons-material/Add'
import { Button, Typography } from '@mui/material'
import React from 'react'

interface AddButtonProps {
  desc: string
  handleClick: () => void
}
const AddButton: React.FC<AddButtonProps> = ({ desc, handleClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<AddIcon />}
      sx={{ float: 'right', marginRight: '30px', marginBottom: '10px' }}
      onClick={handleClick}
    >
      <Typography variant="h5" fontWeight="900" margin="5px">
        {desc}
      </Typography>
    </Button>
  )
}

export default AddButton

