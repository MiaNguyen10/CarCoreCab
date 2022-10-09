import { Box, Stack, Typography } from '@mui/material'
import FrontSample from 'app/assets/images/FrontSample.png'
import FrontLeftCornerSample from 'app/assets/images/FrontLeftCornerSample.png'
import FrontRightCornerSample from 'app/assets/images/FrontRightCornerSample.png'
import RearSample from 'app/assets/images/RearSample.png'
import RearLeftCornerSample from 'app/assets/images/RearLeftCornerSample.png'
import RearRightCornerSample from 'app/assets/images/RearRightCornerSample.png'
import LeftSample from 'app/assets/images/LeftSample.png'
import RightSample from 'app/assets/images/RightSample.png'
import React from 'react'
import { useTranslation } from 'react-i18next'

const SampleImage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', display: 'flex' }}>
        <Stack direction="column" spacing={1}>
          <Box
            sx={{
              width: '300px',
              height: '160px',
              backgroundImage: `url(${FrontSample})`,
            }}
          />
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_FRONT')}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Box
            sx={{
              width: '300px',
              height: '160px',
              backgroundImage: `url(${FrontLeftCornerSample})`,
            }}
          />
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_FRONT_LEFT')}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_IMG_SUBTITLE')}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Box
            sx={{
              width: '300px',
              height: '160px',
              backgroundImage: `url(${FrontRightCornerSample})`,
            }}
          />
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_FRONT_RIGHT')}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_IMG_SUBTITLE')}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Box
            sx={{
              width: '300px',
              height: '160px',
              backgroundImage: `url(${RearSample})`,
            }}
          />
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_REAR')}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', display: 'flex', margin: '20px 0' }}>
        <Stack direction="column" spacing={1}>
          <Box
            sx={{
              width: '300px',
              height: '160px',
              backgroundImage: `url(${RearLeftCornerSample})`,
            }}
          />
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_REAR_LEFT')}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_IMG_SUBTITLE')}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Box
            sx={{
              width: '300px',
              height: '160px',
              backgroundImage: `url(${RearRightCornerSample})`,
            }}
          />
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_REAR_RIGHT')}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_IMG_SUBTITLE')}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Box
            sx={{
              width: '300px',
              height: '160px',
              backgroundImage: `url(${LeftSample})`,
            }}
          />
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_LEFT')}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Box
            sx={{
              width: '300px',
              height: '160px',
              backgroundImage: `url(${RightSample})`,
            }}
          />
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {t('CAR_CAR_LABELING_SAMPLE_RIGHT')}
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}

export default SampleImage

