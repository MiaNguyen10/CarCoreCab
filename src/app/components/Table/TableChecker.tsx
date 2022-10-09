import { Pagination, Paper, Table, TableCellProps, TableContainer, Typography } from '@mui/material'
import NoDataIcon from 'app/assets/icons/NoDataIcon'
import * as React from 'react'

import { DefaultLimit, OnClickType } from 'app/config/Constant'
import BodyTableChecker from './BodyTableChecker'
import HeadTableChecker from './HeadTableChecker'
import { BoxPagination, getComparator, Order, stableSort } from './TableSort'

const TableChecker: React.FC<TableProps> = ({
  headCells,
  rows,
  handleChangePage,
  page,
  handleRequestSort,
  order,
  orderBy,
  numSelected,
  rowCount,
  onSelectAllClick,
  handleClick,
  isSelected,
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
          <HeadTableChecker
            headCells={headCells}
            orderBy={orderBy}
            order={order}
            createSortHandler={createSortHandler}
            numSelected={numSelected}
            rowCount={rowCount || 0}
            onSelectAllClick={onSelectAllClick}
          />
          <BodyTableChecker
            rows={rows}
            begin={begin}
            end={end}
            headCells={headCells}
            orderBy={orderBy}
            order={order}
            getComparator={getComparator}
            stableSort={stableSort}
            handleClick={handleClick}
            isSelected={isSelected}
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
  numSelected: number
  rowCount?: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
  isSelected: (name: string) => boolean
}

export interface HeadCellProps extends TableCellProps {
  id?: string
  label?: string
  minWidth?: number
  format?: string | OnClickType
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  sortable?: boolean
}
export default TableChecker

