import React, { useState } from 'react'
import { Stack, Typography, Button, Box, SxProps, TextField, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { DrawContainer, IAnnotations } from 'app/components/DrawAnnotation'
import NoImage from 'app/assets/icons/NoImage'
import Crosshair from 'app/assets/icons/Crosshair.png'
import SampleConsoleImage from 'app/assets/images/SampleConsoleImage.png'
import LabelImageHolder from './LabelImageHolder'
import SampleImageTooltip from './SampleImageTooltip'
// import { addCar } from 'cores/thunk/car'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import { ICarInformation, IConsole } from '../types'

interface ICarLabelStep3Props {
  carInformation: ICarInformation
  onChangeTab: (newValue: number) => void
  onFormSubmit: (data: ICarInformation) => void
}

export interface IImageSize {
  width: number
  height: number
}

const makeStyles = (): {
  textFieldStyle: SxProps
} => ({
  textFieldStyle: {
    paddingTop: 0,
    position: 'relative',
    top: 25,
    width: '320px',
    height: '50px',
    '.MuiInputLabel-root': {
      zIndex: 0,
      top: '-25px',
      fontSize: '16px',
      fontWeight: 700,
      color: '#333333',
      WebkitTransform: 'none',
      span: {
        color: '#D93A39',
      },
      '&.Mui-focused': {
        color: '#333333',
      },
      '&.Mui-error': {
        color: '#333333',
      },
    },
    '.MuiOutlinedInput-notchedOutline': {
      maxHeight: '55px',
      legend: {
        maxWidth: 0,
      },
    },
  },
})

const schema = yup.object({
  image: yup.object().required('Cosole image was required'),
  gear: yup.string().required('Gear was required'),
  gearPosition: yup.object().required('Gear position was required'),
})

const CarLabelStep3 = ({ carInformation, onFormSubmit, onChangeTab }: ICarLabelStep3Props): JSX.Element => {
  const { t } = useTranslation()
  const styles = makeStyles()

  const [isDraw, setIsDraw] = useState<boolean>(false)
  const [addCarErrorMessage, setAddCarErrorMessage] = useState<string | undefined>()

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    watch,
    getValues,
  } = useForm<IConsole>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      image: carInformation?.console?.image,
      gear: carInformation?.console?.gear ?? 'AT',
      gearPosition: carInformation?.console?.gearPosition,
    },
  })

  const onSubmit: SubmitHandler<IConsole> = (console) => {
    try {
      onFormSubmit({
        registrationBook: carInformation.registrationBook,
        console: console,
      })
      onChangeTab(3)
      setAddCarErrorMessage(undefined)
    } catch (error) {
      const errorMessage = backendErrorToMessage(error as IError)
      setAddCarErrorMessage(errorMessage)
    }
  }

  const imageSize = (url: string): Promise<IImageSize> => {
    const img = document.createElement('img')

    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        const width = img.naturalWidth
        const height = img.naturalHeight
        resolve({ width, height })
      }
      img.onerror = reject
    })
    img.src = url

    return promise as Promise<IImageSize>
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} direction="column" alignItems="center" spacing={5}>
      <Typography variant="h3">{t('CAR_CAR_LABELING_STEP_3_DESC')}</Typography>
      <Stack direction="row" spacing={5}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: '#F7F7F7', width: 873, height: watch('image') ? 'auto' : 540 }}
        >
          {watch('image')?.url ? (
            <LabelImageHolder isUploadedImage={!!watch('image')} onSetDraw={() => setIsDraw(!isDraw)}>
              <Controller
                control={control}
                name="gearPosition"
                render={({ field: { onChange } }): JSX.Element => (
                  <DrawContainer
                    isDraw={isDraw}
                    width={853}
                    imageWidth={getValues('image').width}
                    imageHeight={getValues('image').height}
                    onChange={({ x, y, width, height }: IAnnotations): void => {
                      onChange({ x, y, width, height })
                    }}
                  >
                    <Box component="img" alt="background" src={watch('image').url} />
                  </DrawContainer>
                )}
              />
            </LabelImageHolder>
          ) : (
            <NoImage />
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Box
            sx={{
              width: '32px',
              height: '32px',
              marginTop: '35px',
              backgroundImage: `url(${Crosshair})`,
              cursor: watch('image') ? 'pointer' : 'not-allowed',
            }}
            onClick={() => setIsDraw(!isDraw)}
          />
          <Controller
            control={control}
            name="gear"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                select
                value={value}
                onChange={onChange}
                required
                inputProps={{ required: false }}
                label={t('CAR_CAR_LABELING_GEAR')}
                variant="outlined"
                error={!!formErrors?.gear || !!formErrors?.gearPosition}
                helperText={formErrors?.gear?.message ?? formErrors?.gearPosition?.message}
                disabled={!watch('image')}
              >
                <MenuItem value={'AT'}>A/T</MenuItem>
                <MenuItem value={'MT'}>M/T</MenuItem>
                <MenuItem value={'NotSure'}>Not sure</MenuItem>
              </TextField>
            )}
          />
        </Stack>
      </Stack>
      {formErrors?.image && (
        <Typography variant="body2" sx={{ color: '#d32f2f' }}>
          {formErrors.image?.message}
        </Typography>
      )}
      {addCarErrorMessage && (
        <Typography mt={3} sx={{ color: '#E53F3F' }}>
          {addCarErrorMessage}
        </Typography>
      )}
      <Stack direction="row" justifyContent="flex-start" sx={{ width: '1273px' }}>
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange } }): JSX.Element => (
            <>
              <Button variant="outlined" color="primary" component="label">
                {t('CAR_CAR_LABELING_ADD_IMAGE')}
                <input
                  onChange={async (event): Promise<void> => {
                    const { files } = event.target
                    if (files?.[0]) {
                      const imageUrl = URL.createObjectURL(files[0])
                      const { width, height } = await imageSize(imageUrl)
                      onChange({
                        path: '',
                        url: imageUrl,
                        width,
                        height,
                      })
                    }
                  }}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </Button>
            </>
          )}
        />
        <SampleImageTooltip>
          <Box
            sx={{
              width: '188px',
              height: '140px',
              backgroundImage: `url(${SampleConsoleImage})`,
            }}
          />
        </SampleImageTooltip>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: '1273px' }}>
        <Button variant="contained" color="secondary" onClick={() => onChangeTab(3)}>
          <Typography sx={{ fontWeight: 900, fontSize: '14px' }}>{t('CAR_CAR_LABELING_SKIP_BUTTON')}</Typography>
        </Button>
        <Button variant="contained" type="submit">
          <Typography sx={{ fontWeight: 900, fontSize: '14px' }}>{t('CAR_CAR_LABELING_SAVE_BUTTON')}</Typography>
        </Button>
      </Stack>
    </Stack>
  )
}

export default CarLabelStep3

