import React from 'react'
import { Stack, Pagination, Typography } from '@mui/material'
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    gridPaginationRowRangeSelector,
    gridRowCountSelector,
    gridPageSizeSelector,
  } from '@mui/x-data-grid'

const TablePagination = (): JSX.Element => {
    const apiRef = useGridApiContext()
    const rowRange = useGridSelector(apiRef, gridPaginationRowRangeSelector)
    const page = useGridSelector(apiRef, gridPageSelector)
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)
    const rowCount = useGridSelector(apiRef, gridRowCountSelector)
    const pageSize = useGridSelector(apiRef, gridPageSizeSelector)

return (
        <Stack
            direction='row'
            sx={{
                marginRight: '10px',
            }}
        >
            <Pagination
                count={pageCount}
                page={page + 1}
                onChange={(_, page): void => {
                    apiRef.current.setPage(page - 1)
                }}
            />
            <Typography fontWeight="400" fontSize="14px" marginTop="5px">
                {rowRange && `${pageSize * page + 1}-${pageSize * page + 1 + rowRange.lastRowIndex} of ${rowCount}`}
            </Typography>
        </Stack>
    )
}

export default TablePagination
