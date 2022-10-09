import React from 'react'
import { TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import SortIcon from 'app/assets/icons/SortIcon'

import { HeadCellProps, Order } from './TableSort'

interface HeadTableProps {
  headCells?: Array<HeadCellProps>
  order: Order
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderBy?: any
  createSortHandler: (property?: string) => (event: React.MouseEvent<unknown>) => void
}
const HeadTable: React.FC<HeadTableProps> = ({ headCells, order, orderBy, createSortHandler }) => {
  return (
    <>
      <TableHead>
        <TableRow>
          {headCells?.map((headCell: HeadCellProps) => (
            <TableCell key={headCell.id} align={headCell?.align || 'left'} style={{ minWidth: headCell.minWidth }}>
              {headCell?.sortable ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  IconComponent={SortIcon}
                >
                  {headCell.label}
                </TableSortLabel>
              ) : (
                <Typography variant="h4" sx={{ fontSize: '14px', lineHeight: '21px', color: '#012336' }}>
                  {headCell.label}
                </Typography>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  )
}

export default HeadTable

