import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  styled,
  Typography,
} from '@mui/material'
import { LabelTypo, SearchSelect, TextFieldFill } from 'app/components'
import { Province } from 'app/config/Data'
import { licensePlateRegExp } from 'cores/utils/regexFormat'
import React from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

interface AddCarPopupProps {
  open: boolean
  handleClose: () => void
  onFormSubmit: (data: ICarCheckDuplicate) => void
  errorMessage?: string
}

const DialogActionsStyled = styled(DialogActions)({
  margin: 'auto',
})

const ButtonDialogStyled = styled(Button)({
  maxHeight: 26,
  borderRadius: 2,
  margin: '10px',
})

export interface ICarCheckDuplicate {
  licensePlateNo: string
  province: string
}

const AddCarPopup = ({ open, handleClose, onFormSubmit, errorMessage }: AddCarPopupProps) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const defaultValues = {
    licensePlateNo: '',
    province: '',
  }

  const schema = yup.object().shape({
    licensePlateNo: yup
      .string()
      .required(t('CAR_CAR_LABELING_INPUT_ERROR_VALIDATION'))
      .matches(licensePlateRegExp, t('CAR_CAR_LABELING_INPUT_LICENSE_PLATE_NO_ERROR_VALIDATION')),
    province: yup.string().required(),
  })

  const methods = useForm<ICarCheckDuplicate>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues,
  })

  const { handleSubmit, control } = methods

  const onSubmit: SubmitHandler<ICarCheckDuplicate> = (data): void => {
    onFormSubmit(data)
    navigate(`/car/add/${data.licensePlateNo}:${data.province}`)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          <Typography variant="h4" fontWeight={400}>
            {t('CAR_POP_UP_DESC_1')} <b>{t('CAR_POP_UP_DESC_2')}</b> {t('CAR_POP_UP_DESC_3')}{' '}
            <b>{t('CAR_POP_UP_DESC_4')}</b> {i18n.language === 'th' && t('CAR_POP_UP_DESC_5')}
          </Typography>
        </DialogContentText>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: '10px' }}
              >
                <Grid item xs={12}>
                  <div>
                    <LabelTypo desc={`${t('CAR_LICENSE_PLATE_NO')}`} />
                    <Controller
                      name="licensePlateNo"
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextFieldFill value={value} onChange={onChange} error={error} width={320} />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <LabelTypo desc={`${t('CAR_PROVINCE')}`} />
                    <Controller
                      name="province"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <SearchSelect value={value} onChange={onChange} options={Province} width={320} />
                      )}
                    />
                  </div>
                </Grid>
                {errorMessage && (
                  <Typography mt={3} sx={{ color: '#E53F3F' }}>
                    {errorMessage}
                  </Typography>
                )}
                <Grid item xs={12}>
                  <DialogActionsStyled>
                    <ButtonDialogStyled onClick={handleClose} variant="outlined" color="primary" size="small">
                      {t('CANCEL_BUTTON')}
                    </ButtonDialogStyled>
                    <ButtonDialogStyled type="submit" variant="contained" color="primary" size="small">
                      {t('CAR_POP_UP_ADD_BUTTON')}
                    </ButtonDialogStyled>
                  </DialogActionsStyled>
                </Grid>
              </Grid>
            </Box>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default AddCarPopup

