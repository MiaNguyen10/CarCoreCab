import React from 'react'
import useDimensions from 'react-cool-dimensions'
import { Box } from '@mui/material'
import DrawAnnotation, { IAnnotations } from './DrawAnnotation'

interface IMultiDrawContainerProps {
    width: number
    imageWidth: number
    imageHeight: number
    drawObject: {
        key: string
        isDraw: boolean
        defaultValue?: IAnnotations
        onChange?: (annotations: IAnnotations) => void
    }[]
    children: JSX.Element
}

const MultiDrawContainer = ({
    drawObject,
    width,
    children,
    imageWidth,
    imageHeight,
}: IMultiDrawContainerProps): JSX.Element => {
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
            {drawObject.map(({ key, isDraw, defaultValue, onChange }) => (
                <Box key={key} sx={{
                    position: isDraw ? 'relative' : 'absolute',
                    zIndex: isDraw ? 1 : 'auto',
                    top: isDraw ? 'auto' : 0,
                }}>
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
            ))}
        </Box>
    )
}

export default MultiDrawContainer
