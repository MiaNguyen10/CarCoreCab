import React, { useState } from 'react'
import { Box } from '@mui/material'
import { Stage, Layer, Rect } from 'react-konva'
import Konva from 'konva'

interface IDrawAnnotationProps {
  stageWidth: number
  stageHeight: number
  imageWidth: number
  imageHeight: number
  isDraw: boolean | boolean[]
  onChange?: (annotations: IAnnotations) => void
}

export interface IAnnotations {
  x: number
  y: number
  width: number
  height: number
  key: number
}

const DrawAnnotation = ({
  stageWidth,
  stageHeight,
  imageWidth,
  imageHeight,
  isDraw,
  onChange,
}: IDrawAnnotationProps): JSX.Element => {
  const getDefaultAnnotation = () => {
    if(typeof isDraw === 'object') {
      return (isDraw as boolean[]).map((_data, index) => (
        {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          key: index + 1,
        }
      ))
    }

    return []
  }

  const [annotations, setAnnotations] = useState<IAnnotations[]>(getDefaultAnnotation())
  const [newAnnotation, setNewAnnotation] = useState<IAnnotations[]>([])

  const handleCorrectPosition = ({ x, y, width, height, key }: IAnnotations): void => {
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
            key,
        })
      }
  }

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (newAnnotation.length === 0) {
      const coordinate = event?.target?.getStage()?.getPointerPosition()
      setNewAnnotation([
        {
          x: coordinate?.x ?? 0,
          y: coordinate?.y ?? 0,
          width: 0,
          height: 0,
          key: 0,
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
        key: typeof isDraw === 'object' ? (isDraw as unknown as boolean[]).indexOf(true) + 1 : annotations.length + 1,
      }
      if(typeof isDraw === 'object') {
        if(annotations.length >= (isDraw as boolean[]).length) {
          annotations.splice((isDraw as boolean[]).indexOf(true), 1)
        }
        annotations.splice((isDraw as boolean[]).indexOf(true), 0, annotationToAdd)
        setNewAnnotation([])
        setAnnotations(annotations)
      } else {
        setNewAnnotation([])
        setAnnotations([annotationToAdd])
      }
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
          key: 1,
        },
      ])
    }
  }

  const annotationsToDraw = [...annotations, ...newAnnotation]

return (
    <Box sx={{ cursor: isDraw ? 'crosshair' : 'unset' }}>
        <Stage
            onMouseDown={isDraw ? handleMouseDown : undefined}
            onMouseUp={isDraw ? handleMouseUp : undefined}
            onMouseMove={isDraw ? handleMouseMove : undefined}
            width={stageWidth}
            height={stageHeight}
        >
            <Layer>
                {annotationsToDraw.map((value) => {
                return (
                    <Rect
                        key={value.key}
                        x={value.x}
                        y={value.y}
                        width={value.width}
                        height={value.height}
                        fill="transparent"
                        stroke="red"
                    />
                )
                })}
            </Layer>
        </Stage>
    </Box>
  )
}

export default DrawAnnotation
