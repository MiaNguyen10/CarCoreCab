import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import Crosshair from 'app/assets/icons/Crosshair.png'
import NoImage from 'app/assets/icons/NoImage'
import DashboardImageTooltip from 'app/assets/images/DashboardImageTooltip.png'
import { LabelTypo } from 'app/components'
import { IAnnotations, MultiDrawContainer } from 'app/components/DrawAnnotation'
import { IImageSize } from 'app/pages/carPage/components/CarLabelStep3'
import SampleImageTooltip from 'app/pages/carPage/components/SampleImageTooltip'
import LabelImageHolder from 'app/pages/carPage/components/LabelImageHolder'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import { ICarInformation, IDashboard } from '../types'
import React, { useState } from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface ICarLabelStep4Props {
  carInformation: ICarInformation
  onChangeTab: (newValue: number) => void
  onFormSubmit: (data: ICarInformation) => void
}

const CarLabelStep4 = ({ carInformation, onFormSubmit, onChangeTab }: ICarLabelStep4Props) => {
  const { t } = useTranslation()
  const [isDrawODO, setIsDrawODO] = useState<boolean>(false)
  const [isDrawTrip, setIsDrawTrip] = useState<boolean>(false)

  const schema = yup.object({
    image: yup.object().required(t('CAR_CAR_LABELING_STEP_4_IMAGE_ERROR')),
    mileageODO: yup.object().shape({
      position: yup.object().required(t('CAR_CAR_LABELING_POSITION_ERROR_VALIDATION')),
      // eslint-disable-next-line no-confusing-arrow
      value: yup.lazy((value) =>
        value === ''
          ? yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION'))
          : yup.number().typeError(t('CAR_CAR_LABELING_INPUT__MILEAGE_TRIP_ERROR_VALIDATION')),
      ),
    }),
    mileageTrip: yup.object().shape({
      position: yup.object(),
      // eslint-disable-next-line no-confusing-arrow
      value: yup.lazy((value) =>
        value === ''
          ? yup.string().nullable()
          : yup.number().typeError(t('CAR_CAR_LABELING_INPUT__MILEAGE_TRIP_ERROR_VALIDATION')),
      ),
    }),
  })

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    watch,
    getValues,
  } = useForm<IDashboard>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      image: carInformation?.dashboard?.image,
      mileageODO: {
        value: carInformation?.dashboard?.mileageODO?.value ?? '',
        position: carInformation?.dashboard?.mileageODO?.position,
      },
      mileageTrip: {
        value: carInformation?.dashboard?.mileageTrip?.value ?? '',
        position: carInformation?.dashboard?.mileageTrip?.position,
      },
    },
  })

  const onSubmit: SubmitHandler<IDashboard> = (dashboard) => {
    try {
      onFormSubmit({
        registrationBook: carInformation.registrationBook,
        dashboard,
      })
      onChangeTab(4)
    } catch (error) {
      const errorMessage = backendErrorToMessage(error as IError)
      errorMessage
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
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography variant="h3" sx={{ margin: '0 auto' }}>
          {t('CAR_CAR_LABELING_STEP_4_DESC1')}
        </Typography>
        <Typography variant="h3" sx={{ margin: '0 auto' }}>
          {t('CAR_CAR_LABELING_STEP_4_DESC2')}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={5}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: '#F7F7F7', width: 873, height: watch('image') ? 'auto' : 540 }}
        >
          {watch('image')?.url ? (
            <LabelImageHolder>
              <Controller
                control={control}
                name="mileageODO.position"
                render={({ field: { onChange: onChangeODO } }): JSX.Element => (
                  <Controller
                    control={control}
                    name="mileageTrip.position"
                    render={({ field: { onChange: onChangeTrip } }): JSX.Element => (
                      <MultiDrawContainer
                        width={853}
                        imageWidth={getValues('image').width}
                        imageHeight={getValues('image').height}
                        drawObject={[
                          {
                            key: 'odo',
                            isDraw: isDrawODO,
                            defaultValue: carInformation?.dashboard?.mileageODO?.position,
                            onChange: ({ x, y, width, height }: IAnnotations): void => {
                              onChangeODO({ x, y, width, height })
                            },
                          },
                          {
                            key: 'trip',
                            isDraw: isDrawTrip,
                            defaultValue: carInformation?.dashboard?.mileageTrip?.position,
                            onChange: ({ x, y, width, height }: IAnnotations): void => {
                              onChangeTrip({ x, y, width, height })
                            },
                          },
                        ]}
                      >
                        <Box component="img" alt="background" src={watch('image').url} />
                      </MultiDrawContainer>
                    )}
                  />
                )}
              />
            </LabelImageHolder>
          ) : (
            <NoImage />
          )}
        </Stack>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" spacing={1}>
            <Box
              sx={{
                width: '32px',
                height: '32px',
                marginTop: 4,
                background: isDrawODO ? '#e1e0e0' : 'none',
                borderRadius: '10px',
                backgroundImage: `url(${Crosshair})`,
                cursor: watch('image') ? 'pointer' : 'not-allowed',
              }}
              onClick={() => {
                setIsDrawODO(!isDrawODO)
                if (isDrawTrip) {
                  setIsDrawTrip(false)
                }
              }}
            />
            <div>
              <LabelTypo desc={`${t('CAR_CAR_LABELING_STEP_4_MILEAGE_ODO')}`} required />
              <Controller
                control={control}
                name="mileageODO.value"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!formErrors.mileageODO?.position || !!formErrors.mileageODO?.value}
                    helperText={formErrors.mileageODO?.position?.message || formErrors.mileageODO?.value?.message}
                    autoComplete="off"
                    InputProps={{
                      sx: { height: 44, width: 320 },
                    }}
                    disabled={!watch('image')}
                  />
                )}
              />
            </div>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Box
              sx={{
                width: '32px',
                height: '32px',
                marginTop: 4,
                background: isDrawTrip ? '#e1e0e0' : 'none',
                borderRadius: '10px',
                backgroundImage: `url(${Crosshair})`,
                cursor: watch('image') ? 'pointer' : 'not-allowed',
              }}
              onClick={() => {
                setIsDrawTrip(!isDrawTrip)
                if (isDrawODO) {
                  setIsDrawODO(false)
                }
              }}
            />
            <div>
              <LabelTypo desc={`${t('CAR_CAR_LABELING_STEP_4_MILEAGE_TRIP')}`} />
              <Controller
                control={control}
                name="mileageTrip.value"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!formErrors.mileageTrip?.position || !!formErrors.mileageTrip?.value}
                    helperText={formErrors.mileageTrip?.position?.message || formErrors.mileageTrip?.value?.message}
                    autoComplete="off"
                    InputProps={{
                      sx: { height: 44, width: 320 },
                    }}
                    disabled={!watch('image')}
                  />
                )}
              />
            </div>
          </Stack>
        </Stack>
      </Stack>
      {formErrors?.image && (
        <Typography variant="body2" sx={{ color: '#d32f2f' }}>
          {formErrors.image?.message}
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
              backgroundImage: `url(${DashboardImageTooltip})`,
            }}
          />
        </SampleImageTooltip>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: '1273px' }}>
        <Button variant="contained" color="secondary" onClick={() => onChangeTab(4)}>
          {t('CAR_CAR_LABELING_SKIP_BUTTON')}
        </Button>
        <Button variant="contained" type="submit">
          {t('CAR_CAR_LABELING_SAVE_BUTTON')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default CarLabelStep4

