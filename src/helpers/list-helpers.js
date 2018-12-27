import React from 'react'
import { Link } from 'react-router'
import { TableRowColumn } from 'material-ui/Table'
import { logo } from '../constants/configConstants';

export const getFiltered = (registerForFilter, filterText) => {
    if (registerForFilter && registerForFilter.constructor === Array) {
        return registerForFilter.filter(register => {
            if (register.name) {
                const name = register.name.toLowerCase()
                console.log(filterText);
                
                const filter = filterText.toLowerCase()
                return name.includes(filter)
            }
        })
    }
}

let makeColumnKey = 0
export function makeColumn(column, elementContent, link, style = {}) {
    var elemento
    makeColumnKey++
    if (column.content) {
        console.log(elementContent);
        elemento = column.content(elementContent)
    }
    if (column.link) {
        elemento = <Link to={column.link(link)} className={column.className} onClick={column.onClick}>{elemento}</Link>
    }
    elemento = <TableRowColumn style={style} key={column.name + makeColumnKey}>{elemento} </TableRowColumn>
    return elemento
}
// style={{width: style}}
