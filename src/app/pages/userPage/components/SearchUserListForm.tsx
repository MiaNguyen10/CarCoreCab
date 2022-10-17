import React from 'react'
import { Button, MenuItem, InputAdornment, TextField, SxProps, Stack } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SearchIcon from 'app/assets/icons/SearchIcon'
import useCompany from 'cores/services/companylist'
import { EStatus } from 'app/config/Constant'

export interface ISearchUserListInput {
    searchKey: string
    company: string
    status: string
}

interface ISearchUserListFormProps {
    onSearch: (data: ISearchUserListInput) => void
}

const makeStyles = (): {
    textFieldStyle: SxProps
  } => ({
    textFieldStyle: {
      width: '320px',
      '.MuiOutlinedInput-root': {
        height: 44,
      },
      '.MuiSelect-select': {
        marginTop: 1,
      },
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
        legend: {
          maxWidth: 0,
        },
      },
    },
  })

const SearchUserListForm = ({ onSearch }: ISearchUserListFormProps): JSX.Element => {
    const { companyList } = useCompany()
    const { t } = useTranslation()
    const styles = makeStyles()
    const {
        handleSubmit,
        control,
      } = useForm<ISearchUserListInput>({
        defaultValues: {
            searchKey: '',
            company: 'All',
            status: 'all',
        },
      })

      const onSubmit: SubmitHandler<ISearchUserListInput> = (data): void => {
        onSearch(data)
    }

    return (
        <Stack
            onSubmit={handleSubmit(onSubmit)}
            direction='row'
            component='form'
            alignItems='center'
            spacing={3}
        >
             <Controller
                control={control}
                name='searchKey'
                render={({ field: { onChange, value } }) => (
                    <TextField
                        sx={{
                            ...styles.textFieldStyle,
                            width: '380px',
                        }}
                        placeholder={`${t('USER_LIST_SEARCH_USER')}`}
                        value={value}
                        onChange={onChange}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
            <Controller
                control={control}
                name='company'
                render={({ field: { onChange, value } }) => (
                    <TextField
                        sx={styles.textFieldStyle}
                        select
                        onChange={onChange}
                        value={value}
                        variant="outlined"
                        label={t('COMPANY')}
                    >
                        {companyList.map((company) => (
                            <MenuItem value={company} key={company}>{company}</MenuItem>
                        ))}
                    </TextField>
                )}
            />
            <Controller
                control={control}
                name='status'
                render={({ field: { onChange, value } }) => (
                    <TextField
                        sx={{
                            ...styles.textFieldStyle,
                            width: '140px',
                        }}
                        select
                        onChange={onChange}
                        value={value}
                        variant="outlined"
                        label={t('STATUS')}
                    >
                        {Object.keys(EStatus).map((status) => (
                        <MenuItem value={status} key={status}>
                            {EStatus[status as keyof typeof EStatus]}
                        </MenuItem>
                        ))}
                    </TextField>
                )}
            />
            <Button type="submit" variant="outlined">
                {t('SEARCH')}
            </Button>
        </Stack>
    )
}

export default SearchUserListForm
