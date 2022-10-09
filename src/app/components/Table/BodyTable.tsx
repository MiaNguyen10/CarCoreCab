import React from 'react'
import { TableBody, TableCell, TableRow } from '@mui/material'

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
}

const BodyTable: React.FC<BodyTableProps> = ({
  rows,
  begin,
  end,
  order,
  orderBy,
  headCells,
  getComparator,
  stableSort,
}) => {
  return (
    <>
      <TableBody>
        {rows
          ? stableSort(rows, getComparator(order, orderBy))
              .slice(begin, end)
              .map((row: ArrayType, index: number) => {
                return (
                  <TableRow key={`${index}_${Math.random() * 100000}`} hover role="checkbox" tabIndex={-1}>
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
                )
              })
          : null}
      </TableBody>
    </>
  )
}

export default BodyTable

