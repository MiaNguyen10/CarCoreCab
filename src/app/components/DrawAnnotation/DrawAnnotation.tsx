import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { Stage, Layer, Rect } from 'react-konva'
import Konva from 'konva'

interface IDrawAnnotationProps {
  stageWidth: number
  stageHeight: number
  imageWidth: number
  imageHeight: number
  isDraw: boolean
  defaultValue?: IAnnotations
  onChange?: (annotations: IAnnotations) => void
}

export interface IAnnotations {
  x: number
  y: number
  width: number
  height: number
}

const DrawAnnotation = ({
  stageWidth,
  stageHeight,
  imageWidth,
  imageHeight,
  isDraw,
  defaultValue,
  onChange,
}: IDrawAnnotationProps): JSX.Element => {
  const [annotations, setAnnotations] = useState<IAnnotations[]>([])
  const [newAnnotation, setNewAnnotation] = useState<IAnnotations[]>([])

  const handleCorrectPosition = ({ x, y, width, height }: IAnnotations): void => {
    if(onChange) {
        const xPosition = (x / stageWidth) * imageWidth
        const yPosition = (y / stageHeight) * imageHeight
        const actualWidth = (width / stageWidth) * imageWidth
        const actualHeight = (height / stageHeight) * imageHeight
        onChange({
            x: actualWidth >= 0 ? xPosition : xPosition + actualWidth,
            y: actualHeight >= 0 ? yPosition : yPosition + actualHeight,
            width: Math.abs(actualWidth),
            height: Math.abs(actualHeight),
        })
      }
  }

  const handleOnImagePosition = ({
    x: xPosition,
    y: yPosition,
    width: actualWidth,
    height: actualHeight,
  }: IAnnotations): IAnnotations => (
    {
      x: xPosition / imageWidth * stageWidth,
      y: yPosition / imageHeight * stageHeight,
      width: actualWidth / imageWidth * stageWidth,
      height: actualHeight / imageHeight * stageHeight,
    }
  )

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (newAnnotation.length === 0) {
      const coordinate = event?.target?.getStage()?.getPointerPosition()
      setNewAnnotation([
        {
          x: coordinate?.x ?? 0,
          y: coordinate?.y ?? 0,
          width: 0,
          height: 0,
        },
      ])
    }
  }

  const handleMouseUp = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0]?.x ?? 0
      const sy = newAnnotation[0]?.y ?? 0
      const coordinate = event?.target?.getStage()?.getPointerPosition()
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: (coordinate?.x ?? 0) - sx,
        height: (coordinate?.y ?? 0) - sy,
      }
      setNewAnnotation([])
      setAnnotations([annotationToAdd])
      handleCorrectPosition(annotationToAdd)
    }
  }

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0]?.x ?? 0
      const sy = newAnnotation[0]?.y ?? 0
      const coordinate = event?.target?.getStage()?.getPointerPosition()
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: (coordinate?.x ?? 0) - sx,
          height: (coordinate?.y ?? 0) - sy,
        },
      ])
    }
  }

  useEffect(() => {
    if(defaultValue) {
      setAnnotations([handleOnImagePosition(defaultValue)])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const annotationsToDraw = [...annotations, ...newAnnotation]

  return (
    <Box sx={{
        cursor: isDraw ? 'crosshair' : 'unset',
        zIndex: isDraw ? 999 : 'auto',
      }}
    >
        <Stage
            onMouseDown={isDraw ? handleMouseDown : undefined}
            onMouseUp={isDraw ? handleMouseUp : undefined}
            onMouseMove={isDraw ? handleMouseMove : undefined}
            width={stageWidth}
            height={stageHeight}
        >
            <Layer>
                {annotationsToDraw.map((value) => (
                  <Rect
                    key={value.x}
                    x={value.x}
                    y={value.y}
                    width={value.width}
                    height={value.height}
                    fill="transparent"
                    stroke="red"
                  />
                ))}
            </Layer>
        </Stage>
    </Box>
  )
}

export default DrawAnnotation

