/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material'
import SearchIcon from 'app/assets/icons/SearchIcon'
import { SelectArray } from 'app/components'
import { Brand, Model } from 'app/config/Data'
import React from 'react'
import { Control, Controller, FormProvider, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SearchProps } from 'app/pages/carPage/CarList'
import SelectCarStatus from './SelectCarStatus'

const FormSearch = styled('form')({
  maxWidth: '80%',
  margin: 'auto',
})

interface CarFormProps {
  methods: UseFormReturn<SearchProps, any>
  handleSubmit: UseFormHandleSubmit<SearchProps>
  onSearch: (search: SearchProps) => void
  control: Control<SearchProps, any>
}

const CarForm = ({ methods, handleSubmit, onSearch, control }: CarFormProps) => {
  const { t } = useTranslation()

  return (
    <FormProvider {...methods}>
      <FormSearch onSubmit={handleSubmit(onSearch)}>
        <Grid container spacing={3}>
          <Grid item lg={3.5}>
            <Controller
              name="searchInput"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div>
                  <TextField
                    type="text"
                    id="outlined-basic input-with-icon-textfield"
                    value={value}
                    placeholder={`${t('CAR_LIST_SEARCH_CAR')}`}
                    onChange={onChange}
                    error={!!error}
                    autoComplete="off"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      sx: { height: 44 },
                    }}
                    variant="outlined"
                  />
                </div>
              )}
            />
          </Grid>
          <Grid item lg={3}>
            <div>
              <Typography variant="h4" sx={{ margin: '-25px 0 5px' }}>
                {t('CAR_MAKE_BRAND')}
              </Typography>
              <Controller
                name="brand"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <SelectArray value={value} onChange={onChange} error={error} selectArray={Brand} />
                )}
              />
            </div>
          </Grid>
          <Grid item lg={3}>
            <div>
              <Typography variant="h4" sx={{ margin: '-25px 0 5px' }}>
                {t('CAR_MODEL')}
              </Typography>
              <Controller
                name="model"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <SelectArray value={value} onChange={onChange} error={error} selectArray={Model} />
                )}
              />
            </div>
          </Grid>
          <Grid item lg={1.5}>
            <div>
              <Typography variant="h4" sx={{ margin: '-25px 0 5px' }}>
                {t('STATUS')}
              </Typography>
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <SelectCarStatus value={value} onChange={onChange} error={error} />
                )}
              />
            </div>
          </Grid>
          <Grid item lg={1}>
            <div>
              <Button type="submit" variant="outlined">
                {t('SEARCH')}
              </Button>
            </div>
          </Grid>
        </Grid>
      </FormSearch>
    </FormProvider>
  )
}

export default CarForm

