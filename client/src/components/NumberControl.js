import React from 'react'
import { changeValue, checkDone, countBlank } from '../constants/sudoku'

// Numbers section user can choose from
export default function NumberControl(props) {
    const { setSelected, selected, setMistakes, setGameWon } = props

    const updateValue = (value) => {
        let correct = changeValue(selected.row, selected.column, value, selected.setValue, selected.setCorrect)
        if(!correct) {
            setMistakes(prev => prev += 1)
        }
        setSelected(prev => { return { row: prev.row, column: prev.column, group: prev.group, setValue: prev.setValue, value: value, setCorrect: prev.setCorrect } })
        let blank = countBlank()
        setGameWon(blank === 0)
    }

    let buttons = Array.from({ length: 9 }, (_, index) => {
        index += 1
        return <button onClick={() => updateValue(index)} className={checkDone(index) ? 'button button-outline-primary solid done' : 'button button-outline-primary solid'} key={index}>{index}</button>
    })

    return (
        <div className='numbers-keyboard'>
            {buttons}
        </div>
    )
}