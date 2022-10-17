import React, { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { HandIcon, ResizeIcon, ZoomInIcon, ZoomOutIcon } from 'app/assets/icons/IconImage'
import Crosshair from 'app/assets/icons/Crosshair.png'

export interface ILabelImageHolderProps {
  onSetDraw?: () => void
  children: JSX.Element
}

const LabelImageHolder = ({ onSetDraw, children }: ILabelImageHolderProps): JSX.Element => {
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
              left: 330,
            }}
          >
            {onSetDraw && (
              <IconButton onClick={onSetDraw}>
                <Box
                  sx={{
                    width: '32px',
                    height: '32px',
                    backgroundImage: `url(${Crosshair})`,
                    cursor: 'pointer',
                  }}
                />
              </IconButton>
            )}
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

export default LabelImageHolder

