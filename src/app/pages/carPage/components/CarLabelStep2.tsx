import { yupResolver } from '@hookform/resolvers/yup'
import ClearIcon from '@mui/icons-material/Clear'
import { Box, Button, IconButton, SelectChangeEvent, styled, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import Crosshair from 'app/assets/icons/Crosshair.png'
import { LabelTypo, SearchSelect, SelectColor, TextFieldFill } from 'app/components'
import { DrawContainer, IAnnotations } from 'app/components/DrawAnnotation'
import { Province } from 'app/config/Data'
import { IImageSize } from 'app/pages/carPage/components/CarLabelStep3'
import SampleImage from 'app/pages/carPage/components/SampleImage'
import SelectView from 'app/pages/carPage/components/SelectView'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import LabelImageHolder from './LabelImageHolder'
import { ICarInformation, ICarPhotos } from '../types'
import _without from 'lodash/without'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'

declare module 'yup' {
  interface ArraySchema<T> {
    unique(message: string, mapper: (val: ICarPhotos) => string): ArraySchema<T>
  }
}

interface ICarLabelStep2Props {
  carInformation: ICarInformation
  onChangeTab: (newValue: number) => void
  onFormSubmit: (data: ICarInformation) => void
}

interface ICarLabelStep2Input {
  color: string[]
  otherColor: string
  carPhotos?: ICarPhotos[]
}

const BoxStyle = styled(Box)({
  boxSizing: 'border-box',
  width: 1263,
  margin: '10px auto',
  backgroundColor: '#FFFFFF',
  border: '1px solid #DDDDDD',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  paddingBottom: 110,
})

const CarLabelStep2 = ({ carInformation, onFormSubmit, onChangeTab }: ICarLabelStep2Props) => {
  const { t } = useTranslation()
  const { licensePlate } = useParams()
  const [colorChecked, setColorChecked] = useState<string[]>([])
  const [isDraw, setIsDraw] = useState<boolean>(false)

  yup.addMethod(yup.array, 'unique', function (message, mapper = (val: string) => val) {
    return this.test('unique', message, (list = []) => list.length === new Set(list.map(mapper)).size)
  })

  const schema = yup.object().shape({
    color: yup.array().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    carPhotos: yup
      .array()
      .min(4, t('CAR_CAR_LABELING_STEP_2_VIEW_MIN_LIMIT'))
      .max(8, t('CAR_CAR_LABELING_STEP_2_VIEW_MAX_LIMIT'))
      .unique(t('CAR_CAR_LABELING_STEP_2_DUPLICATE_VIEW'), (val) => val.angle)
      .of(
        yup.object().shape({
          angle: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
        }),
      ),
  })

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    getValues,
    watch,
  } = useForm<ICarLabelStep2Input>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      color: carInformation?.registrationBook?.color,
      otherColor: carInformation?.registrationBook?.otherColor ?? '',
      carPhotos: carInformation?.carPhotos,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'carPhotos',
  })

  const viewValue = useWatch({
    control,
    name: 'carPhotos',
  })

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setColorChecked(event.target.value as string[])
  }

  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault()
    setColorChecked((current) => _without(current, value))
  }

  const onSubmit: SubmitHandler<ICarLabelStep2Input> = (data): void => {
    try {
      onFormSubmit({
        registrationBook: carInformation.registrationBook,
        carPhotos: data?.carPhotos,
      })
      onChangeTab(2)
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
    <>
      <Typography variant="h3" sx={{ textAlign: 'center', color: '#012336' }}>
        {t('CAR_CAR_LABELING_STEP_2_DESC')}
      </Typography>
      <Typography variant="h3" sx={{ textAlign: 'center', color: '#012336', fontSize: 18, margin: '30px' }}>
        {t('CAR_CAR_LABELING_STEP_2_SAMPLE')}
      </Typography>
      <SampleImage />
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="column"
        alignItems="flex-start"
        spacing={3}
        sx={{ marginLeft: 9 }}
      >
        <Controller
          control={control}
          name="carPhotos"
          render={(): JSX.Element => (
            <>
              <Button variant="outlined" color="primary" component="label">
                {t('CAR_CAR_LABELING_ADD_IMAGE')}
                <input
                  onChange={(event) => {
                    if (event.target.files) {
                      Object.entries(event.target.files).map(async (e) => {
                        const imageUrl = URL.createObjectURL(e[1])
                        const { width, height } = await imageSize(imageUrl)
                        append({
                          angle: '',
                          image: { url: URL.createObjectURL(e[1]), path: e[1].name, width: width, height: height },
                          licensePlate: {
                            position: { x: 0, y: 0, width: 0, height: 0 },
                            licensePlateNo: licensePlate?.split(':')[0],
                            province: licensePlate?.split(':')[1],
                          },
                        })
                      })
                    }
                  }}
                  type="file"
                  accept="image/*"
                  hidden
                  multiple
                  disabled={fields.length === 8}
                />
              </Button>
            </>
          )}
        />
        <Stack direction="row" spacing={2} sx={{ margin: '20px 70px' }}>
          <div>
            <LabelTypo desc={`${t('CAR_CAR_LABELING_COLOR')}`} />
            <Controller
              name="color"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectColor
                  colorChecked={colorChecked}
                  handleChange={handleChange}
                  onChange={onChange}
                  handleDelete={handleDelete}
                  error={error}
                />
              )}
            />
            {formErrors.color && <Typography variant="subtitle1">{formErrors.color.message}</Typography>}
          </div>
          <div>
            <Typography variant="h4" sx={{ marginBottom: '5px' }}>
              {t('CAR_CAR_LABELING_OTHER_COLOR')}
            </Typography>
            <Controller
              name="otherColor"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextFieldFill value={value} onChange={onChange} error={error} width={100} />
              )}
            />
          </div>
        </Stack>
        {fields.map((file, index) => {
          return (
            <div key={file.id}>
              <BoxStyle>
                <IconButton sx={{ float: 'right', margin: '16px' }} onClick={() => remove(index)}>
                  <ClearIcon />
                </IconButton>
                <Stack direction="row" spacing={2} sx={{ marginTop: 7 }}>
                  <Stack direction="column" spacing={2} sx={{ margin: '-50px 24px' }}>
                    <LabelImageHolder
                      isUploadedImage={!!watch(`carPhotos.${index}.image`)}
                      onSetDraw={() => setIsDraw(!isDraw)}
                    >
                      <Controller
                        control={control}
                        name={`carPhotos.${index}.licensePlate.position`}
                        render={({ field: { onChange } }): JSX.Element => (
                          <DrawContainer
                            isDraw={isDraw}
                            width={853}
                            imageWidth={getValues(`carPhotos.${index}.image`).width}
                            imageHeight={getValues(`carPhotos.${index}.image`).height}
                            onChange={({ x, y, width, height }: IAnnotations): void => {
                              onChange({ x, y, width, height })
                            }}
                          >
                            <Box component="img" alt="background" src={file.image.url} sx={{ marginTop: '48px' }} />
                          </DrawContainer>
                        )}
                      />
                    </LabelImageHolder>
                    <Typography variant="h6" sx={{ fontSize: 14 }}>
                      {file.image.path}
                    </Typography>
                  </Stack>
                  <Stack direction="column" spacing={2} sx={{ margin: '48px 50px' }}>
                    <div>
                      <LabelTypo desc={`${t('CAR_CAR_LABELING_VIEW')}`} />
                      <Controller
                        name={`carPhotos.${index}.angle`}
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <>
                            <SelectView value={value} onChange={onChange} width={320} error={error} />
                            {error && <Typography variant="subtitle1">{error.message}</Typography>}
                          </>
                        )}
                      />
                    </div>
                    <Stack direction="row" spacing={1} sx={{ paddingLeft: 1 }}>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          backgroundImage: `url(${Crosshair})`,
                          cursor: 'pointer',
                        }}
                        onClick={() => setIsDraw(!isDraw)}
                      />
                      <Typography variant="h3" sx={{ paddingTop: '3px' }}>{`${t(
                        'CAR_CAR_LABELING_LICENSE_PLATE',
                      )}`}</Typography>
                    </Stack>
                    {viewValue &&
                    (viewValue[index]?.angle === 'CAR_CAR_LABELING_VIEW_FRONT' ||
                      viewValue[index]?.angle === 'CAR_CAR_LABELING_VIEW_FRONT_LEFT' ||
                      viewValue[index]?.angle === 'CAR_CAR_LABELING_VIEW_FRONT_RIGHT' ||
                      viewValue[index]?.angle === 'CAR_CAR_LABELING_VIEW_REAR' ||
                      viewValue[index]?.angle === 'CAR_CAR_LABELING_VIEW_REAR_LEFT' ||
                      viewValue[index]?.angle === 'CAR_CAR_LABELING_VIEW_REAR_RIGHT') ? (
                      <Stack direction="column" spacing={1} sx={{ paddingLeft: 12 }}>
                        <Typography variant="h4" sx={{ marginBottom: '5px' }}>
                          {t('CAR_CAR_LABELING_LICENSE_PLATE_NO')}
                        </Typography>
                        <Controller
                          name={`carPhotos.${index}.licensePlate.licensePlateNo`}
                          control={control}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextFieldFill value={value} onChange={onChange} error={error} width={180} />
                          )}
                        />
                        <Typography variant="h4" sx={{ marginBottom: '5px' }}>
                          {t('CAR_CAR_LABELING_PROVINCE')}
                        </Typography>
                        <Controller
                          name={`carPhotos.${index}.licensePlate.province`}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <SearchSelect value={value || ''} onChange={onChange} options={Province} width={180} />
                          )}
                        />
                      </Stack>
                    ) : null}
                  </Stack>
                </Stack>
              </BoxStyle>
            </div>
          )
        })}
        {formErrors?.carPhotos && (
          <Typography variant="body2" sx={{ color: '#d32f2f' }}>
            {formErrors.carPhotos?.message}
          </Typography>
        )}
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: '1273px' }}>
          <Button variant="contained" color="secondary" onClick={() => onChangeTab(2)}>
            <Typography sx={{ fontWeight: 900, fontSize: '14px' }}>{t('CAR_CAR_LABELING_SKIP_BUTTON')}</Typography>
          </Button>
          <Button variant="contained" type="submit">
            <Typography sx={{ fontWeight: 900, fontSize: '14px' }}>{t('CAR_CAR_LABELING_SAVE_BUTTON')}</Typography>
          </Button>
        </Stack>
      </Stack>
    </>
  )
}

export default CarLabelStep2

