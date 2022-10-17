import { SxProps } from '@mui/material'
import {
    GridEnrichedColDef,
    GridSlotsComponentsProps,
    GridInitialState,
    GridRowIdGetter,
    GridColumnVisibilityModel,
    GridSelectionModel,
    GridRowParams,
    GridValidRowModel,
} from '@mui/x-data-grid'
import React from 'react'

export interface IDataGridProps<T> {
    sx?: SxProps
    rowHeight?: number
    columns: GridEnrichedColDef[]
    rows: object[]
    page: number
    rowsPerPage?: number
    rowCount: number
    pagination?: boolean
    isLoading: boolean
    onPageChange?: (page: number) => void
    toolbar?: React.FC<T>
    toolbarProps?: GridSlotsComponentsProps['toolbar']
    checkbox?: React.FC<T>
    checkboxProps?: GridSlotsComponentsProps['baseCheckbox']
    initialState?: GridInitialState
    getRowId?: GridRowIdGetter
    columnVisibilityModel?: GridColumnVisibilityModel
    checkboxSelection?: boolean
    onSelectionModelChange?: (selectionModel: GridSelectionModel) => void
    selectionModel?: GridSelectionModel
    onRowSelectable?: ((params: GridRowParams<GridValidRowModel>) => boolean)
    hideFooter?: boolean
    paginationMode?: 'client' | 'server'
}
