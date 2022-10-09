import React from 'react'
import Typography from '@mui/material/Typography'

const HomePage = () => {
  const items = []
  for (let i = 0; i < 3; i++) {
    items.push(<Typography variant="h2">Home Page {i}</Typography>)
  }

  return <div>{items}</div>
}

export default HomePage

