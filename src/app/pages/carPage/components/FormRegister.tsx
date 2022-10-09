import { Button, SelectChangeEvent, Stack, styled, Typography } from '@mui/material'
import { DatePickerBuddhist, LabelTypo, SearchSelect, SelectColor, TextFieldFill } from 'app/components'
import { Brand, Model, Province } from 'app/config/Data'
import { IRegistrationBook } from '../types'
import React from 'react'
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface RegistrationBookProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IRegistrationBook, any>
  errors: FieldErrorsImpl<IRegistrationBook>
  colorChecked?: string[]
  handleChange: (event: SelectChangeEvent<string[]>) => void
  handleDelete: (e: React.MouseEvent, value: string) => void
  onChangeTab: (newValue: number) => void
}

const TypoError = styled(Typography)({
  fontWeight: 400,
  fontSize: '0.75rem',
  color: '#d32f2f',
  margin: '3px 14px',
  marginBottom: -25,
})

const TypoSmallError = styled(Typography)({
  fontWeight: 400,
  fontSize: '0.75rem',
  color: '#d32f2f',
  marginBottom: -40,
})

const FormRegister = ({
  control,
  errors,
  colorChecked,
  handleChange,
  handleDelete,
  onChangeTab,
}: RegistrationBookProps) => {
  const { t } = useTranslation()

  return (
    <Stack direction="column" spacing={4.5}>
      {/* Row 1 */}
      <Stack direction="row" spacing={2.5}>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_REGISTERED_DATE')}`} />
          <Controller
            name="registeredDate"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickerBuddhist value={value ?? ''} onChange={onChange} error={error} width={160} />
            )}
          />
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_LICENSE_PLATE_NO')}`} />
          <Controller
            name="licensePlateNo"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldFill value={value} onChange={onChange} error={error} width={160} isView={true} />
            )}
          />
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_PROVINCE')}`} />
          <Controller
            name="province"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value} onChange={onChange} options={Province} width={180} isDisabled={true} />
            )}
          />
          {errors.province && <TypoError>{errors.province.message}</TypoError>}
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_VEHICLE_TYPE')}`} />
          <Controller
            name="vehicleType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={Province} width={330} />
            )}
          />
          {errors.vehicleType && <TypoError>{errors.vehicleType.message}</TypoError>}
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_BODY_TYPE')}`} />
          <Controller
            name="bodyType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={Province} width={320} />
            )}
          />
          {errors.bodyType && <TypoError>{errors.bodyType.message}</TypoError>}
        </div>
      </Stack>
      {/* Row 2 */}
      <Stack direction="row" spacing={3}>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_MAKE_BRAND')}`} />
          <Controller
            name="makeBrand"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect options={Brand} value={value ?? ''} onChange={onChange} width={280} />
            )}
          />
          {errors.makeBrand && <TypoError>{errors.makeBrand.message}</TypoError>}
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_MODEL')}`} />
          <Controller
            name="model"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={Model} width={370} />
            )}
          />
          {errors.model && <TypoError>{errors.model.message}</TypoError>}
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_MODEL_BOOK')}`} />
          <Controller
            name="modelText"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldFill value={value} onChange={onChange} error={error} width={370} />
            )}
          />
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_MODEL_YEAR')}`} />
          <Controller
            name="modelYear"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={Province} width={166} />
            )}
          />
          {errors.modelYear && <TypoError>{errors.modelYear.message}</TypoError>}
        </div>
      </Stack>
      {/* Row 3 */}
      <Stack direction="row" spacing={3}>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_SUB_MODEL')}`} />
          <Controller
            name="subModel"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={Brand} width={830} />
            )}
          />
          {errors.subModel && <TypoError>{errors.subModel.message}</TypoError>}
        </div>
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
          {errors.color && <TypoError>{errors.color.message}</TypoError>}
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
      {/* Row 4 */}
      <Stack direction="row" spacing={3}>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_FRAME_NO')}`} />
          <Controller
            name="vinFrameNo"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldFill value={value} onChange={onChange} error={error} width={250} />
            )}
          />
        </div>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_FRAME_POSITION')}
          </Typography>
          <Controller
            name="framePosition"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldFill value={value} onChange={onChange} error={error} width={200} />
            )}
          />
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_OTHER_FUEL')}`} />
          <Controller
            name="fuel"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={Brand} width={200} />
            )}
          />
          {errors.fuel && <TypoError>{errors.fuel.message}</TypoError>}
        </div>
      </Stack>
      {/* Row 5 */}
      <Stack direction="row" spacing={3}>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_ENGINE_BRAND')}
          </Typography>
          <Controller
            name="engineBrand"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={Brand} width={250} />
            )}
          />
          {errors.engineBrand && <TypoError>{errors.engineBrand.message}</TypoError>}
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_ENGINE_NO')}`} />
          <Controller
            name="engineNo"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldFill value={value} onChange={onChange} error={error} width={200} />
            )}
          />
        </div>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_ENGINE_POSITION')}
          </Typography>
          <Controller
            name="enginePosition"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldFill value={value} onChange={onChange} error={error} width={200} />
            )}
          />
        </div>
      </Stack>
      {/* Row 6 */}
      <Stack direction="row" spacing={3}>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_CYLINDER')}
          </Typography>
          <Controller
            name="cylinder"
            control={control}
            render={({ field: { onChange, value } }) => <TextFieldFill value={value} onChange={onChange} width={80} />}
          />
          {errors.cylinder && <TypoSmallError>{errors.cylinder.message}</TypoSmallError>}
        </div>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_CC')}
          </Typography>
          <Controller
            name="cc"
            control={control}
            render={({ field: { onChange, value } }) => <TextFieldFill value={value} onChange={onChange} width={80} />}
          />
          {errors.cc && <TypoSmallError>{errors.cc.message}</TypoSmallError>}
        </div>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_HP')}
          </Typography>
          <Controller
            name="hp"
            control={control}
            render={({ field: { onChange, value } }) => <TextFieldFill value={value} onChange={onChange} width={80} />}
          />
          {errors.hp && <TypoSmallError>{errors.hp.message}</TypoSmallError>}
        </div>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_AXLE')}
          </Typography>
          <Controller
            name="axle"
            control={control}
            render={({ field: { onChange, value } }) => <TextFieldFill value={value} onChange={onChange} width={80} />}
          />
          {errors.axle && <TypoSmallError>{errors.axle.message}</TypoSmallError>}
        </div>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_WHEELS')}
          </Typography>
          <Controller
            name="wheels"
            control={control}
            render={({ field: { onChange, value } }) => <TextFieldFill value={value} onChange={onChange} width={80} />}
          />
          {errors.wheels && <TypoSmallError>{errors.wheels.message}</TypoSmallError>}
        </div>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_TYRES')}
          </Typography>
          <Controller
            name="tyres"
            control={control}
            render={({ field: { onChange, value } }) => <TextFieldFill value={value} onChange={onChange} width={80} />}
          />
          {errors.tyres && <TypoSmallError>{errors.tyres.message}</TypoSmallError>}
        </div>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_TEXT_FROM_BOOK')}
          </Typography>
          <Controller
            name="textFromTheBook"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldFill value={value} onChange={onChange} error={error} width={200} />
            )}
          />
        </div>
      </Stack>
      {/* Row 7 */}
      <Stack direction="row">
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_AUTHORIZED_DATE')}`} />
          <Controller
            name="authorizedDate"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickerBuddhist value={value ?? ''} onChange={onChange} error={error} width={160} />
            )}
          />
        </div>
      </Stack>
      {/* Row 8 */}
      <Stack direction="row" spacing={3}>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_PURCHASE_PRICE')}
          </Typography>
          <Controller
            name="purchase.purchasePrice"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldFill value={value} onChange={onChange} error={error} width={200} />
            )}
          />
        </div>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_APPRAISED_DATE')}
          </Typography>
          <Controller
            name="purchase.appraisedDatePurchase"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickerBuddhist value={value ?? ''} onChange={onChange} error={error} width={160} />
            )}
          />
        </div>
      </Stack>
      {/* Row 9 */}
      <Stack direction="row" spacing={3}>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_SALE_PRICE')}
          </Typography>
          <Controller
            name="sale.salePrice"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldFill value={value} onChange={onChange} error={error} width={200} />
            )}
          />
        </div>
        <div>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>
            {t('CAR_CAR_LABELING_APPRAISED_DATE')}
          </Typography>
          <Controller
            name="sale.appraisedDateSale"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickerBuddhist value={value ?? ''} onChange={onChange} error={error} width={160} />
            )}
          />
        </div>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="contained" color="secondary" onClick={() => onChangeTab(1)}>
          {t('CAR_CAR_LABELING_SKIP_BUTTON')}
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {t('CAR_CAR_LABELING_SAVE_BUTTON')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default FormRegister

