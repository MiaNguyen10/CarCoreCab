import React from 'react'
import { Button, MenuItem, InputAdornment, TextField, SxProps, Stack } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SearchIcon from 'app/assets/icons/SearchIcon'
import { Brand, Model } from 'app/config/Data'
import { EStatus } from 'app/config/Constant'

export interface ISearchCarListInput {
    licensePlate: string
    makeBrand: string
    model: string
    status: string
}

interface ISearchCarListFormProps {
    onFormSubmit: (data: ISearchCarListInput) => void
    isLoading?: boolean
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

const SearchCarListForm = ({
    onFormSubmit,
    isLoading,
}: ISearchCarListFormProps): JSX.Element => {
    const { t } = useTranslation()
    const styles = makeStyles()
    const {
        handleSubmit,
        control,
      } = useForm<ISearchCarListInput>({
        defaultValues: {
            licensePlate: '',
            makeBrand: 'All',
            model: 'All',
            status: 'all',
        },
      })

    const onSubmit: SubmitHandler<ISearchCarListInput> = (data): void => {
        onFormSubmit(data)
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
                name='licensePlate'
                render={({ field: { onChange, value } }) => (
                    <TextField
                        sx={styles.textFieldStyle}
                        placeholder={`${t('CAR_LIST_SEARCH_CAR')}`}
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
                name='makeBrand'
                render={({ field: { onChange, value } }) => (
                    <TextField
                        sx={styles.textFieldStyle}
                        select
                        onChange={onChange}
                        value={value}
                        variant="outlined"
                        label={t('CAR_MAKE_BRAND')}
                    >
                        {Brand.map((brand) => (
                            <MenuItem value={brand} key={brand}>{brand}</MenuItem>
                        ))}
                    </TextField>
                )}
            />
            <Controller
                control={control}
                name='model'
                render={({ field: { onChange, value } }) => (
                    <TextField
                        sx={styles.textFieldStyle}
                        select
                        onChange={onChange}
                        value={value}
                        variant="outlined"
                        label={t('CAR_MODEL')}
                    >
                        {Model.map((model) => (
                            <MenuItem value={model} key={model}>{model}</MenuItem>
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
            <Button type="submit" variant="outlined" disabled={isLoading}>
                {t('SEARCH')}
            </Button>
        </Stack>
    )
}

export default SearchCarListForm
