import React from 'react'
import {
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    styled,
    TooltipProps,
    tooltipClasses,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { InfoBubbleIcon } from 'app/assets/icons/InfoBubbleIcon'

interface ISampleImageTooltipProps {
    children: JSX.Element
}

const SampleTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(() => ((
    {
      [`& .${tooltipClasses.arrow}`]: {
        color: '#e6e3e3',
      },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#FFFFFF',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        fontWeight: 600,
        borderRadius: 3,
      },
    }
  )))

const SampleImageTooltip = ({ children }: ISampleImageTooltipProps): JSX.Element => {
    const { t } = useTranslation()

    return (
        <SampleTooltip
            title={
                <Stack
                    direction="column"
                    spacing={1}
                    divider={<Divider orientation="horizontal" flexItem />}
                >
                    <Typography variant="h4" sx={{ paddingTop: '5px' }}>
                        {t('CAR_CAR_LABELING_SAMPLE')}
                    </Typography>
                    {children}
                </Stack>
            }
            placement="right-start"
        >
            <IconButton>
                <InfoBubbleIcon />
            </IconButton>
        </SampleTooltip>
    )
}

export default SampleImageTooltip

