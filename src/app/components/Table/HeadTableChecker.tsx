import React from 'react'
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import SortIcon from 'app/assets/icons/SortIcon'
import CheckedIcon from 'app/assets/icons/CheckedIcon'
import { HeadCellProps, Order } from './TableSort'
import IconCheckAll from 'app/assets/icons/IconCheckAll'

interface HeadTableProps {
  headCells?: Array<HeadCellProps>
  order: Order
  orderBy?: string
  createSortHandler: (property?: string) => (event: React.MouseEvent<unknown>) => void
  numSelected: number
  rowCount: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const HeadTableChecker: React.FC<HeadTableProps> = ({
  headCells,
  order,
  orderBy,
  createSortHandler,
  numSelected,
  rowCount,
  onSelectAllClick,
}) => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              icon={<CheckedIcon />}
              checkedIcon={<IconCheckAll />}
            />
          </TableCell>
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

export default HeadTableChecker

