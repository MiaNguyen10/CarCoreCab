import React from 'react'
import useDimensions from 'react-cool-dimensions'
import { Stack, Box } from '@mui/material'
import DrawAnnotation, { IAnnotations } from 'app/components/DrawAnnotation/DrawAnnotation'

interface IDrawContainerProps {
  isDraw: boolean | boolean[]
  width: number
  imageWidth: number
  imageHeight: number
  onChange?: (annotations: IAnnotations) => void
  children: JSX.Element
}

const DrawContainer = ({
  isDraw,
  width,
  onChange,
  children,
  imageWidth,
  imageHeight,
}: IDrawContainerProps): JSX.Element => {
  const { observe, height } = useDimensions()

  return (
    <Box
      sx={{
        width,
        height: height,
        border: '3px',
        position: 'relative',
        img: {
          width: '100%',
        },
      }}
    >
      <Stack
        ref={observe}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {children}
      </Stack>
      <DrawAnnotation
        stageWidth={width}
        stageHeight={height}
        onChange={onChange}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        isDraw={isDraw}
      />
    </Box>
  )
}

export default DrawContainer

