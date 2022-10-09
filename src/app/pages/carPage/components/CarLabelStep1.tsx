/* eslint-disable no-confusing-arrow */
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, SelectChangeEvent, Stack, Typography } from '@mui/material'
import NoImage from 'app/assets/icons/NoImage'
import RegistrationBookImageTooltip from 'app/assets/images/RegistrationBookImageTooltip.png'
import FormRegister from 'app/pages/carPage/components/FormRegister'
import { IImageSize } from 'app/pages/carPage/components/CarLabelStep3'
import ImageHolder from 'app/pages/carPage/components/ImageHolder'
import SampleImageTooltip from 'app/pages/carPage/components/SampleImageTooltip'
import { backendErrorToMessage, IError } from 'cores/factories/errorFactory'
import _without from 'lodash/without'
import React, { useState } from 'react'
import useDimensions from 'react-cool-dimensions'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { ICarInformation, IRegistrationBook } from 'app/pages/carPage/types'

interface ICarLabelStep1Props {
  carInformation: ICarInformation
  onChangeTab: (newValue: number) => void
  onFormSubmit: (data: ICarInformation) => void
}

const CarLabelStep1 = ({ carInformation, onChangeTab, onFormSubmit }: ICarLabelStep1Props) => {
  const { t } = useTranslation()
  const [colorChecked, setColorChecked] = useState<string[]>([])
  const { observe, height } = useDimensions()

  const schema = yup.object().shape({
    image: yup.object().required(t('CAR_CAR_LABELING_STEP_1_IMAGE_ERROR')),
    registeredDate: yup.string().required().typeError(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    licensePlateNo: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    province: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    vehicleType: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    bodyType: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    makeBrand: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    model: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    modelText: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    modelYear: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    subModel: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    color: yup.array().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    vinFrameNo: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    fuel: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    engineNo: yup.string().required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    authorizedDate: yup.string().required().typeError(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION')),
    cylinder: yup.lazy((value) =>
      value === '' ? yup.string() : yup.number().typeError(t('CAR_CAR_LABELING_STEP_1_NUMBER_IS_REQUIRED')),
    ),
    cc: yup.lazy((value) =>
      value === '' ? yup.string() : yup.number().typeError(t('CAR_CAR_LABELING_STEP_1_NUMBER_IS_REQUIRED')),
    ),
    hp: yup.lazy((value) =>
      value === '' ? yup.string() : yup.number().typeError(t('CAR_CAR_LABELING_STEP_1_NUMBER_IS_REQUIRED')),
    ),
    axle: yup.lazy((value) =>
      value === '' ? yup.string() : yup.number().typeError(t('CAR_CAR_LABELING_STEP_1_NUMBER_IS_REQUIRED')),
    ),
    wheels: yup.lazy((value) =>
      value === '' ? yup.string() : yup.number().typeError(t('CAR_CAR_LABELING_STEP_1_NUMBER_IS_REQUIRED')),
    ),
    tyres: yup.lazy((value) =>
      value === '' ? yup.string() : yup.number().typeError(t('CAR_CAR_LABELING_STEP_1_NUMBER_IS_REQUIRED')),
    ),
    purchase: yup.object().shape({
      purchasePrice: yup.lazy((value) =>
        value === ''
          ? yup.string()
          : yup
              .number()
              .typeError(t('CAR_CAR_LABELING_STEP_1_NUMBER_IS_REQUIRED_2'))
              .test(
                'purchase-price-required',
                t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION'),
                (value, context): boolean => !(!value && !!context.parent.appraisedDatePurchase),
              ),
      ),
      appraisedDatePurchase: yup
        .string()
        .nullable()
        .test(
          'purchase-appraised-date-required',
          t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION'),
          (value, context): boolean => !(!value && !!context.parent.purchasePrice),
        ),
    }),
    sale: yup.object().shape({
      salePrice: yup.lazy((value) =>
        value === ''
          ? yup.string()
          : yup
              .number()
              .typeError(t('CAR_CAR_LABELING_STEP_1_NUMBER_IS_REQUIRED_2'))
              .test(
                'purchase-price-required',
                t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION'),
                (value, context): boolean => !(!value && !!context.parent.appraisedDateSale),
              ),
      ),
      appraisedDateSale: yup
        .string()
        .nullable()
        .test(
          'sale-appraised-date-required',
          t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION'),
          (value, context): boolean => !(!value && !!context.parent.salePrice),
        ),
    }),
  })

  const methods = useForm<IRegistrationBook>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: carInformation.registrationBook,
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = methods

  const onSubmit = (data: IRegistrationBook): void => {
    try {
      onFormSubmit({ registrationBook: data })
      onChangeTab(1)
    } catch (error) {
      const errorMessage = backendErrorToMessage(error as IError)
      errorMessage
    }
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setColorChecked(event.target.value as string[])
  }

  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault()
    setColorChecked((current) => _without(current, value))
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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="column"
            spacing={3}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography variant="h3" sx={{ textAlign: 'center', color: '#012336' }}>
              {t('CAR_CAR_LABELING_UPLOAD_IMAGE_DESC')}
            </Typography>
            {/* Image holder */}
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ backgroundColor: '#F7F7F7', width: 1262, height: watch('image') ? 'auto' : 540 }}
            >
              {watch('image')?.url ? (
                <ImageHolder mLeft={530}>
                  <Box
                    sx={{
                      width: 1262,
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
                      <Box component="img" alt="background" src={watch('image')?.url} />
                    </Stack>
                  </Box>
                </ImageHolder>
              ) : (
                <NoImage />
              )}
            </Stack>
            {errors?.image && (
              <Typography variant="body2" sx={{ color: '#d32f2f' }}>
                {errors.image?.message}
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
                    width: '188px',
                    height: '167.68px',
                    backgroundImage: `url(${RegistrationBookImageTooltip})`,
                  }}
                />
              </SampleImageTooltip>
              <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#BBBBBB', paddingTop: 1.3 }}>
                {watch('image')?.path}
              </Typography>
            </Stack>
            {/* Form register */}
            <FormRegister
              control={control}
              errors={errors}
              colorChecked={colorChecked}
              handleChange={handleChange}
              handleDelete={handleDelete}
              onChangeTab={onChangeTab}
            />
          </Stack>
        </form>
      </FormProvider>
    </>
  )
}

export default CarLabelStep1

