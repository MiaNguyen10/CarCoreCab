import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import { Button, Typography } from '@mui/material'

interface AddButtonProps {
  desc: string
  url: string
}
const AddButton: React.FC<AddButtonProps> = ({ desc, url }) => {
  const navigate = useNavigate()

  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<AddIcon />}
      sx={{ float: 'right', marginRight: '30px', marginBottom: '10px' }}
      onClick={() => navigate(url)}
    >
      <Typography variant="h5" fontWeight="900" margin="5px">
        {desc}
      </Typography>
    </Button>
  )
}

export default AddButton

