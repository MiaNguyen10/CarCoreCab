/* eslint-disable no-console */
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import CheckedIcon from 'app/assets/icons/CheckedIcon'
import IconCheckSingle from 'app/assets/icons/IconCheckSingle'
import { STATUS } from 'app/config/Constant'
import React from 'react'

import { ArrayType, HeadCellProps, Order } from './TableSort'

interface BodyTableProps {
  rows?: Array<ArrayType>
  begin?: number
  end?: number
  order: Order
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderBy?: any
  headCells?: Array<HeadCellProps>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getComparator: <Key extends string | number | symbol>(order: Order, orderBy: Key) => any
  stableSort: <T>(array: readonly T[], comparator: (a: T, b: T) => number) => T[]
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
  isSelected: (name: string) => boolean
}

const BodyTableChecker: React.FC<BodyTableProps> = ({
  rows,
  begin,
  end,
  order,
  orderBy,
  headCells,
  getComparator,
  stableSort,
  handleClick,
  isSelected,
}) => {
  return (
    <>
      <TableBody>
        {rows
          ? stableSort(rows, getComparator(order, orderBy))
              .slice(begin, end)
              .map((row: ArrayType, index: number) => {
                const isItemSelected = isSelected(row['licensePlateNo'])

                return (
                  <>
                    {row['status'].props.status === STATUS.DRAFT ? (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row['licensePlateNo'])}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`${index}_${Math.random() * 100000}`}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            icon={<CheckedIcon />}
                            checkedIcon={<IconCheckSingle />}
                          />
                        </TableCell>
                        {headCells?.map((headCell: HeadCellProps) => {
                          const value = headCell?.id ? row[headCell.id] : ''

                          return (
                            <TableCell
                              key={`${index || headCell.id}_${Math.random() * 100000}`}
                              align={headCell?.align || 'left'}
                              sx={{ whiteSpace: 'pre-line' }}
                            >
                              {headCell.format && typeof value === 'number' ? headCell.format(value) : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ) : (
                      <TableRow hover role="checkbox" tabIndex={-1} key={`${index}_${Math.random() * 100000}`}>
                        <TableCell padding="checkbox" />
                        {headCells?.map((headCell: HeadCellProps) => {
                          const value = headCell?.id ? row[headCell.id] : ''

                          return (
                            <TableCell
                              key={`${index || headCell.id}_${Math.random() * 100000}`}
                              align={headCell?.align || 'left'}
                              sx={{ whiteSpace: 'pre-line' }}
                            >
                              {headCell.format && typeof value === 'number' ? headCell.format(value) : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )}
                  </>
                )
              })
          : null}
      </TableBody>
    </>
  )
}

export default BodyTableChecker

