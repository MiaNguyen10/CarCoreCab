import { Button, SelectChangeEvent, Stack, styled, Typography } from '@mui/material'
import { DatePickerBuddhist, LabelledInput, LabelTypo, SearchSelect, SelectColor } from 'app/components'
import { Brand, Model } from 'app/config/Data'
import { IRegistrationBook } from '../types'
import React from 'react'
import { Control, Controller, FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'cores/store/hook'
import { selectProvinceList } from 'cores/reducers/constant'
import { getProvinceList } from 'cores/thunk/constant'
import { selectState } from 'cores/reducers/authentication'

export interface RegistrationBookProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IRegistrationBook, any>
  errors: FieldErrorsImpl<IRegistrationBook>
  colorChecked?: string[]
  handleChange: (event: SelectChangeEvent<string[]>) => void
  handleDelete: (e: React.MouseEvent, value: string) => void
  onChangeTab: (newValue: number) => void
  register: UseFormRegister<IRegistrationBook>
}
const TypoError = styled(Typography)({
  fontWeight: 400,
  fontSize: '0.75rem',
  color: '#d32f2f',
  margin: '3px 14px',
  marginBottom: -25,
})

const FormRegister = ({
  control,
  errors,
  colorChecked,
  handleChange,
  handleDelete,
  onChangeTab,
  register,
}: RegistrationBookProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const provinces = useAppSelector(selectProvinceList)
  const token = useAppSelector(selectState)

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(getProvinceList(token.token!))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack direction="column" spacing={2.5}>
      {/* Row 1 */}
      <Stack direction="row" spacing={3}>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_REGISTERED_DATE')}`} required />
          <Controller
            name="registeredDate"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickerBuddhist value={value ?? ''} onChange={onChange} error={error} width={160} />
            )}
          />
        </div>
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_LICENSE_PLATE_NO')}`}
          name="licensePlateNo"
          errors={errors}
          register={register}
          disabled={true}
          sx={{ width: 180 }}
          required
        />
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_PROVINCE')}`} required />
          <Controller
            name="province"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value} onChange={onChange} options={provinces || []} width={180} isDisabled={true} />
            )}
          />
          {errors.province && <TypoError>{errors.province.message}</TypoError>}
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_VEHICLE_TYPE')}`} required />
          <Controller
            name="vehicleType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={provinces || []} width={330} />
            )}
          />
          {errors.vehicleType && <TypoError>{errors.vehicleType.message}</TypoError>}
        </div>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_BODY_TYPE')}`} required />
          <Controller
            name="bodyType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={provinces || []} width={320} />
            )}
          />
          {errors.bodyType && <TypoError>{errors.bodyType.message}</TypoError>}
        </div>
      </Stack>
      {/* Row 2 */}
      <Stack direction="row" spacing={3}>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_MAKE_BRAND')}`} required />
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
          <LabelTypo desc={`${t('CAR_CAR_LABELING_MODEL')}`} required />
          <Controller
            name="model"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={Model} width={370} />
            )}
          />
          {errors.model && <TypoError>{errors.model.message}</TypoError>}
        </div>
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_MODEL_BOOK')}`}
          name="modelText"
          errors={errors}
          register={register}
          sx={{ width: 370 }}
          required
        />
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_MODEL_YEAR')}`} required />
          <Controller
            name="modelYear"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={provinces || []} width={174} />
            )}
          />
          {errors.modelYear && <TypoError>{errors.modelYear.message}</TypoError>}
        </div>
      </Stack>
      {/* Row 3 */}
      <Stack direction="row" spacing={3}>
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_SUB_MODEL')}`} required />
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
          <LabelTypo desc={`${t('CAR_CAR_LABELING_COLOR')}`} required />
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
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_OTHER_COLOR')}`}
          name="otherColor"
          errors={errors}
          register={register}
          sx={{ width: 108 }}
        />
      </Stack>
      {/* Row 4 */}
      <Stack direction="row" spacing={3}>
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_FRAME_NO')}`}
          name="vinFrameNo"
          errors={errors}
          register={register}
          sx={{ width: 250 }}
          required
        />
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_FRAME_POSITION')}`}
          name="framePosition"
          errors={errors}
          register={register}
          sx={{ width: 200 }}
        />
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_FUEL')}`} required />
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
          <LabelTypo desc={`${t('CAR_CAR_LABELING_ENGINE_BRAND')}`} />
          <Controller
            name="engineBrand"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchSelect value={value ?? ''} onChange={onChange} options={Brand} width={250} />
            )}
          />
          {errors.engineBrand && <TypoError>{errors.engineBrand.message}</TypoError>}
        </div>
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_ENGINE_NO')}`}
          name="engineNo"
          errors={errors}
          register={register}
          sx={{ width: 200 }}
          required
        />
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_ENGINE_POSITION')}`}
          name="enginePosition"
          errors={errors}
          register={register}
          sx={{ width: 200 }}
        />
      </Stack>
      {/* Row 6 */}
      <Stack direction="row" spacing={3}>
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_CYLINDER')}`}
          name="cylinder"
          errors={errors}
          register={register}
          sx={{ width: 80 }}
        />
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_CC')}`}
          name="cc"
          errors={errors}
          register={register}
          sx={{ width: 80 }}
        />
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_HP')}`}
          name="hp"
          errors={errors}
          register={register}
          sx={{ width: 80 }}
        />
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_AXLE')}`}
          name="axle"
          errors={errors}
          register={register}
          sx={{ width: 80 }}
        />
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_WHEELS')}`}
          name="wheels"
          errors={errors}
          register={register}
          sx={{ width: 80 }}
        />
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_TYRES')}`}
          name="tyres"
          errors={errors}
          register={register}
          sx={{ width: 80 }}
        />
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_TEXT_FROM_BOOK')}`}
          name="textFromTheBook"
          errors={errors}
          register={register}
          sx={{ width: 200 }}
        />
      </Stack>
      {/* Row 7 */}
      <Stack direction="row">
        <div>
          <LabelTypo desc={`${t('CAR_CAR_LABELING_AUTHORIZED_DATE')}`} required />
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
      <Stack direction="row" spacing={3} marginTop={'25px'}>
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_PURCHASE_PRICE')}`}
          name="purchase.purchasePrice"
          errors={errors}
          register={register}
          sx={{ width: 200 }}
        />
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_APPRAISED_DATE')}`}
          name="purchase.appraisedDatePurchase"
          errors={errors}
          register={register}
          sx={{ width: 160 }}
        />
      </Stack>
      {/* Row 9 */}
      <Stack direction="row" spacing={3}>
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_SALE_PRICE')}`}
          name="sale.salePrice"
          errors={errors}
          register={register}
          sx={{ width: 200 }}
        />
        <LabelledInput
          title={`${t('CAR_CAR_LABELING_APPRAISED_DATE')}`}
          name="sale.appraisedDateSale"
          errors={errors}
          register={register}
          sx={{ width: 160 }}
        />
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

