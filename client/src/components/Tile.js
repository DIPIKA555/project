import React, { useState, useEffect } from 'react'
import { checkEditableField, getValue } from '../constants/sudoku'

export default function Tile(props) {
    const { setSelected, selected, row, column, group } = props

    const [value, setValue] = useState(getValue(row, column))
    const [current, setCurrent] = useState(false)
    const [inline, setInline] = useState(false)
    const [same, setSame] = useState(false)             // Same value as selected field
    const editable = useState(checkEditableField(row, column))

    useEffect(() => {
        setCurrent(selected.row === row && selected.column === column)
        setInline(selected.row === row || selected.column === column || selected.group === group)
        setSame(getValue(selected.row, selected.column) === value && value !== 0)

        return () => { }
    }, [selected, row, column, group, value])

    const handleClick = () => {
        setSelected({ row: row, column: column, group: group, setValue: setValue, value: value })
    }

    return (
        <div className={current ? 'board-tile selected' : (inline ? 'board-tile inline' : 'board-tile')} onClick={handleClick}>
            <h4 className={!editable && same ? 'read-only font-accent-color' : same ? 'font-accent-color' : !editable ? 'read-only' : ''}>{value !== 0 ? value : ' '}</h4>
        </div>
    )
}