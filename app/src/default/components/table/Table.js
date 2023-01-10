import { useMemo, useEffect } from 'react'

import { useTable, useSortBy } from 'react-table'

import { createStyle } from '../../utils/createStyle'

import styles from './Table.module.css'

export default function Table(attributes){

    const {
        title,
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

    // const filteredColumns = columns.filter(col => col.isVisible !== false)

    const dataMemoized = useMemo(() => data, [data])
    const columnsMemoized = useMemo(() => columns, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setHiddenColumns,
    } = useTable(
        {
            columns:columnsMemoized,
            data:dataMemoized,
        },
        useSortBy
    )

    useEffect(() => {

        setHiddenColumns(columnsMemoized.filter(col => col.isVisible === false).map(col => col.Header))

    }, [columnsMemoized])

    return (
        <div className={createStyle([styles, customStyles], 'container')}>
            {title && <div className={createStyle([styles, customStyles], ['title'])}>{title}</div>}
            <table
                className={createStyle([styles, customStyles], ['table'])}
                {...getTableProps()}>
               <thead
                   className={createStyle([styles, customStyles], ['thead'])}>
                   {headerGroups.map((headerGroup, i) => (
                     <tr
                       className={createStyle([styles, customStyles], ['tr'])}
                       {...headerGroup.getHeaderGroupProps()}>
                       {headerGroup.headers.map(column => (
                         <th
                           className={createStyle([styles, customStyles], ['th'])}
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
                       className={createStyle([styles, customStyles], ['tbody'])}
                       {...getTableBodyProps()}>
                       {rows.map((row, i) => {
                         prepareRow(row)
                         return (
                           <tr
                               className={createStyle([styles, customStyles], ['tr', onRowClick && 'trHoverable'])}
                               onClick={e => onRowClick && onRowClick(row.original)}
                               {...row.getRowProps(getRowProps(row))}>
                                 {row.cells.map(cell => {
                                   return (
                                       <td
                                           className={createStyle([styles, customStyles], ['td', onCellClick && 'tdClickable'])}
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
