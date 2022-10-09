import { Box, IconButton } from '@mui/material'
import { ZoomInIcon, ZoomOutIcon, HandIcon, ResizeIcon } from 'app/assets/icons/IconImage'
import React, { useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

interface IImageHolderProps {
  children: JSX.Element
  mLeft: number
}
const ImageHolder = ({ children, mLeft }: IImageHolderProps): JSX.Element => {
  const [isPan, setIsPan] = useState(true)

  return (
    <TransformWrapper initialScale={1} wheel={{ disabled: true }} panning={{ disabled: isPan }}>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <Box sx={{ position: 'relative' }}>
          <TransformComponent>{children}</TransformComponent>
          <Box
            sx={{
              position: 'absolute',
              backgroundColor: '#F7F7F7',
              bottom: 15,
              left: mLeft,
            }}
          >
            <IconButton onClick={() => zoomIn()}>
              <ZoomInIcon />
            </IconButton>
            <IconButton onClick={() => zoomOut()}>
              <ZoomOutIcon />
            </IconButton>
            <IconButton onClick={() => setIsPan(!isPan)}>
              <HandIcon />
            </IconButton>
            <IconButton onClick={() => resetTransform()}>
              <ResizeIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </TransformWrapper>
  )
}

export default ImageHolder

