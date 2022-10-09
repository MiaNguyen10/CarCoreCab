/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material'
import SearchIcon from 'app/assets/icons/SearchIcon'
import { SelectArray, SelectStatus } from 'app/components'
import useCompany from 'cores/services/companylist'
import React from 'react'
import { Control, Controller, FormProvider, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SearchProps } from 'app/pages/userPage/UserList'

export const FormSearch = styled('form')({
  maxWidth: '70%',
  margin: 'auto',
})

interface UserFormProps {
  methods: UseFormReturn<SearchProps, any>
  handleSubmit: UseFormHandleSubmit<SearchProps>
  control: Control<SearchProps, any>
  onSearch: (search: SearchProps) => void
}

const UserForm = ({ methods, handleSubmit, control, onSearch }: UserFormProps) => {
  const { t } = useTranslation()
  const { companyList } = useCompany()

  return (
    <FormProvider {...methods}>
      <FormSearch onSubmit={handleSubmit(onSearch)}>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <Controller
              name="searchInput"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div>
                  <TextField
                    type="text"
                    id="outlined-basic input-with-icon-textfield"
                    value={value}
                    placeholder={`${t('USER_LIST_SEARCH_USER')}`}
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
                {t('COMPANY')}
              </Typography>
              <Controller
                name="company"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <SelectArray value={value} onChange={onChange} error={error} selectArray={companyList} />
                )}
              />
            </div>
          </Grid>
          <Grid item lg={2}>
            <div>
              <Typography variant="h4" sx={{ margin: '-25px 0 5px' }}>
                {t('STATUS')}
              </Typography>
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <SelectStatus value={value} onChange={onChange} error={error} width={18} />
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

export default UserForm

