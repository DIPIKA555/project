import React from 'react'
import { changeValue } from '../constants/sudoku'

// Numbers section user can choose from
export default function NumberControl(props) {
    const { setSelected, selected } = props

    const updateValue = (value) => {
        changeValue(selected.row, selected.column, value, selected.setValue)
        setSelected(prev => { return { row: prev.row, column: prev.column, group: prev.group, setValue: prev.setValue, value: value } })
    }

    let buttons = Array.from({ length: 9 }, (_, index) => {
        index += 1
        return <button onClick={() => updateValue(index)} className='button button-outline-primary solid' key={index}>{index}</button>
    })

    return (
        <div className='numbers-keyboard'>
            {buttons}
        </div>
    )
}