import { IconButton, styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material'
import ApprovedIcon from 'app/assets/icons/ApprovedIcon'
import DraftIcon from 'app/assets/icons/DraftIcon'
import PendingIcon from 'app/assets/icons/PendingIcon'
import { STATUS } from 'app/config/Constant'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface StatusProps {
  status: string
}
export const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#C7D0D9E5',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#C7D0D9E5',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))

const StatusColumn = ({ status }: StatusProps) => {
  const { t } = useTranslation()
  const titleIcon =
    status === STATUS.DRAFT ? t('STATUS_DRAFT') : status === STATUS.PENDING ? t('STATUS_PENDING') : t('STATUS_APPROVED')

  return (
    <BootstrapTooltip title={titleIcon} placement="right" arrow sx={{ color: '#C7D0D9E5' }}>
      <IconButton>
        {status === STATUS.DRAFT ? <DraftIcon /> : status === STATUS.PENDING ? <PendingIcon /> : <ApprovedIcon />}
      </IconButton>
    </BootstrapTooltip>
  )
}

export default StatusColumn

