import { useMemo } from 'react'

import { useTable, useSortBy } from 'react-table'

import { createStyle } from '../../utils/createStyle'

import styles from './Table.module.css'

export default function Table(attributes){

    const {
        columns,
        data,
        onRowClick,
        onCellClick,
        customStyles,
        getHeaderProps = () => ({}),
        getColumnProps = () => ({}),
        getRowProps = () => ({}),
        getCellProps = () => ({}),
    } = attributes

    const memoColumns = useMemo(
       () => columns,
       []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    return (
        <div className={createStyle([styles, customStyles], 'container')}>
            <table
                className={styles.table}
                {...getTableProps()}>
               <thead
                   className={styles.thead}>
                   {headerGroups.map((headerGroup, i) => (
                     <tr
                       className={styles.tr}
                       {...headerGroup.getHeaderGroupProps()}>
                       {headerGroup.headers.map(column => (
                         <th
                           className={styles.th}
                           {...column.getHeaderProps([
                               column.getSortByToggleProps(),
                               getColumnProps(column),
                               getHeaderProps(column)
                           ])}>
                           {column.render('Header')}
                           <span>
                               {
                                   column.isSorted
                                     ? column.isSortedDesc
                                       ? ' ▼'
                                       : ' ▲'
                                     : ''
                               }
                           </span>
                         </th>
                       ))}
                     </tr>
                   ))}
                   </thead>
                   <tbody
                       className={styles.tbody}
                       {...getTableBodyProps()}>
                       {rows.map((row, i) => {
                         prepareRow(row)
                         return (
                           <tr
                               className={styles.tr}
                               onClick={e => onRowClick && onRowClick(row.original)}
                               {...row.getRowProps(getRowProps(row))}>
                                 {row.cells.map(cell => {
                                   return (
                                       <td
                                           className={styles.td}
                                           onClick={e => onCellClick && onCellClick(cell)}
                                           {...cell.getCellProps([
                                               getColumnProps(cell.column),
                                               getCellProps(cell)
                                           ])}>
                                           {cell.render('Cell')}
                                       </td>
                                   )
                                 })}
                           </tr>
                         )
                       })}
               </tbody>
           </table>
       </div>
    )

}
