import React from 'react'
import useDimensions from 'react-cool-dimensions'
import { Box } from '@mui/material'
import DrawAnnotation, { IAnnotations } from './DrawAnnotation'

interface IDrawContainerProps {
    isDraw: boolean
    width: number
    imageWidth: number
    imageHeight: number
    defaultValue?: IAnnotations
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
    defaultValue,
}: IDrawContainerProps): JSX.Element => {
    const { observe, height } = useDimensions()

    return (
        <Box
            sx={{
                width,
                height: height,
                background: '#F7F7F7',
                border: '3px',
                position: 'relative',
                'img': {
                    width: '100%',
                },
            }}
        >
            <Box
                ref={observe}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                {children}
            </Box>
            <DrawAnnotation
                stageWidth={width}
                stageHeight={height}
                onChange={onChange}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                isDraw={isDraw}
                defaultValue={defaultValue}
            />
        </Box>
    )
}

export default DrawContainer

