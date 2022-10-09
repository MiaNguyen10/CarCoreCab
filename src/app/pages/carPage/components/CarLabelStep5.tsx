import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, Box, Button, Stack, TextField, TextFieldProps, Typography } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import NoImage from 'app/assets/icons/NoImage'
import SelectVector from 'app/assets/icons/SelectVector'
import TaxSignImageTooltip from 'app/assets/images/TaxSignImageTooltip.png'
import { LabelTypo, TextFieldFill } from 'app/components'
import { dateFormats } from 'app/components/TextField/DatePickerBuddhist'
import { Brand } from 'app/config/Data'
import { IImageSize } from 'app/pages/carPage/components/CarLabelStep3'
import SampleImageTooltip from 'app/pages/carPage/components/SampleImageTooltip'
import LabelImageHolder from 'app/pages/carPage/components/LabelImageHolder'
import { CaseForDay } from 'cores/utils/CaseForDay'
import { licensePlateRegExp } from 'cores/utils/regexFormat'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import { ICarInformation, ITaxSign } from '../types'
import React from 'react'
import useDimensions from 'react-cool-dimensions'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'

interface ICarLabelStep5Props {
  carInformation: ICarInformation
  onChangeTab: (newValue: number) => void
  onFormSubmit: (data: ICarInformation) => void
}

const CarLabelStep5 = ({ carInformation, onFormSubmit, onChangeTab }: ICarLabelStep5Props) => {
  const { t } = useTranslation()
  const { observe, height } = useDimensions()
  const { licensePlate } = useParams()

  const schema = yup.object({
    image: yup.object().required(t('CAR_CAR_LABELING_STEP_5_IMAGE_ERROR')),
    licensePlateNo: yup
      .string()
      .required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION'))
      .matches(licensePlateRegExp, t('CAR_CAR_LABELING_INPUT_LICENSE_PLATE_NO_ERROR_VALIDATION')),
    expiryDate: yup
      .string()
      .typeError(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION'))
      .required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    make: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    vinFrameNo: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
  })

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    watch,
  } = useForm<ITaxSign>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      licensePlateNo: licensePlate?.split(':')[0],
      expiryDate: '',
      make: carInformation?.registrationBook?.makeBrand ?? '',
      vinFrameNo: carInformation?.registrationBook?.vinFrameNo ?? '',
    },
  })

  const onSubmit: SubmitHandler<ITaxSign> = (taxSign) => {
    try {
      onFormSubmit({
        registrationBook: carInformation.registrationBook,
        taxSign,
      })
      onChangeTab(5)
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
          {t('CAR_CAR_LABELING_STEP_5_DESC')}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={5}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: '#F7F7F7', width: 873, height: watch('image') ? 'auto' : 540, marginLeft: -4 }}
        >
          {watch('image')?.url ? (
            <LabelImageHolder isUploadedImage={!!watch('image')}>
              <Box
                sx={{
                  width: 873,
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
                  <Box component="img" alt="background" src={watch('image').url} />
                </Stack>
              </Box>
            </LabelImageHolder>
          ) : (
            <NoImage />
          )}
        </Stack>
        <Stack direction="column" spacing={3.3}>
          <div>
            <LabelTypo desc={`${t('CAR_CAR_LABELING_LICENSE_PLATE_NO')}`} />
            <Controller
              control={control}
              name="licensePlateNo"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextFieldFill value={value} onChange={onChange} error={error} width={320} isView={!watch('image')} />
              )}
            />
          </div>
          <div>
            <LabelTypo desc={`${t('CAR_CAR_LABELING_STEP_5_EXPIRY_DATE')}`} />
            <Controller
              control={control}
              name="expiryDate"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th" dateFormats={dateFormats}>
                  <MobileDatePicker
                    inputFormat="DD MMMM BBBB"
                    value={value}
                    onChange={onChange}
                    showToolbar={false}
                    closeOnSelect
                    renderInput={(params: TextFieldProps): JSX.Element => (
                      <TextField
                        {...params}
                        sx={{
                          '.MuiInputBase-input': { width: 290, height: 10 },
                        }}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                    componentsProps={{
                      actionBar: {
                        actions: ['clear', 'today'],
                      },
                    }}
                    dayOfWeekFormatter={(day: string): string => {
                      return CaseForDay(day)
                    }}
                    disabled={!watch('image')}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
          <div>
            <LabelTypo desc={`${t('CAR_CAR_LABELING_MAKE_BRAND')}`} />
            <Controller
              control={control}
              name="make"
              render={({ field: { onChange, value } }) => (
                <>
                  <Autocomplete
                    options={Brand}
                    getOptionLabel={(option): string => option}
                    openOnFocus
                    value={value}
                    popupIcon={<SelectVector />}
                    isOptionEqualToValue={(option, value) => value === '' || option === value}
                    onChange={(_event, newValue): void => {
                      onChange(newValue ?? '')
                    }}
                    renderOption={(optionProps, option): JSX.Element => (
                      <Box component="li" {...optionProps}>
                        {option}
                      </Box>
                    )}
                    renderInput={(params): JSX.Element => <TextField {...params} placeholder="Select" />}
                    sx={{
                      width: 320,
                      '.MuiOutlinedInput-root': {
                        padding: '3px 50px 3px 9px',
                      },
                    }}
                    disabled={!watch('image')}
                  />
                  {formErrors?.make && (
                    <Typography variant="subtitle1" sx={{ marginBottom: -3 }}>
                      {formErrors.make?.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <LabelTypo desc={`${t('CAR_CAR_LABELING_FRAME_NO')}`} />
            <Controller
              control={control}
              name="vinFrameNo"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextFieldFill value={value} onChange={onChange} error={error} width={320} isView={!watch('image')} />
              )}
            />
          </div>
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
                      const imageUrlPath = files[0].name
                      const { width, height } = await imageSize(imageUrl)
                      onChange({
                        path: imageUrlPath,
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
              width: '148px',
              height: '140px',
              backgroundImage: `url(${TaxSignImageTooltip})`,
            }}
          />
        </SampleImageTooltip>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#BBBBBB', paddingTop: 1.3 }}>
          {watch('image') ? watch('image').path : null}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: '1273px' }}>
        <Button variant="contained" color="secondary" onClick={() => onChangeTab(5)}>
          <Typography sx={{ fontWeight: 900, fontSize: '14px' }}>{t('CAR_CAR_LABELING_SKIP_BUTTON')}</Typography>
        </Button>
        <Button variant="contained" type="submit">
          <Typography sx={{ fontWeight: 900, fontSize: '14px' }}>{t('CAR_CAR_LABELING_SAVE_BUTTON')}</Typography>
        </Button>
      </Stack>
    </Stack>
  )
}

export default CarLabelStep5

