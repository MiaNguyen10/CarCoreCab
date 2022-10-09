import { Box, Pagination, Paper, styled, Table, TableCellProps, TableContainer, Typography } from '@mui/material'
import NoDataIcon from 'app/assets/icons/NoDataIcon'
import * as React from 'react'

import { DefaultLimit, OnClickType } from 'app/config/Constant'
import BodyTable from './BodyTable'
import HeadTable from './HeadTable'

export const BoxPagination = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  margin: '5px 25px',
  float: 'right',
})
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

export type Order = 'asc' | 'desc'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map((el) => el[0])
}

const TableSort: React.FC<TableProps> = ({
  headCells,
  rows,
  handleChangePage,
  page,
  handleRequestSort,
  order,
  orderBy,
}) => {
  const cpage = page || 1
  const rowsPerPage = DefaultLimit

  if ((!rows && !headCells) || (rows && rows.length === 0 && headCells && headCells.length === 0)) {
    return <></>
  }
  const createSortHandler = (property?: string) => (event: React.MouseEvent<unknown>) => {
    if (handleRequestSort) {
      handleRequestSort(event, property)
    }
  }

  const begin = (cpage - 1) * rowsPerPage
  const end = begin + rowsPerPage

  return (
    <Paper>
      <TableContainer sx={{ border: '1px solid #F7F7F7', margin: '0 20px', width: '97%' }}>
        <Table stickyHeader aria-label="sticky table">
          <HeadTable headCells={headCells} orderBy={orderBy} order={order} createSortHandler={createSortHandler} />
          <BodyTable
            rows={rows}
            begin={begin}
            end={end}
            headCells={headCells}
            orderBy={orderBy}
            order={order}
            getComparator={getComparator}
            stableSort={stableSort}
          />
        </Table>
      </TableContainer>
      {rows?.length !== 0 && rows ? (
        <BoxPagination>
          <Pagination count={Math.ceil(rows.length / DefaultLimit) || 0} page={page} onChange={handleChangePage} />
          <Typography fontWeight="400" fontSize="14px" marginTop="5px">
            {begin + 1} - {end > rows.length ? rows.length : end} of {rows.length}
          </Typography>
        </BoxPagination>
      ) : (
        <NoDataIcon />
      )}
    </Paper>
  )
}
export interface TablePageProps {
  page?: number
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type ArrayType = {
  [key: string]: any
}
export interface TableProps extends TablePageProps {
  headCells?: Array<HeadCellProps>
  rows?: Array<ArrayType>
  handleChangePage: (event: unknown, newPage: number) => void
  handleRequestSort: (event: React.MouseEvent<unknown>, property?: string) => void
  order: Order
  orderBy?: any
}

export interface HeadCellProps extends TableCellProps {
  id?: string
  label?: string
  minWidth?: number
  format?: string | OnClickType
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  sortable?: boolean
}
export default TableSort

