import React, { useEffect, useState } from 'react'
import Tile from './Tile'
import { sudokuObject } from '../constants/sudoku'

const calculateTilesValues = (group) => {
    const { min_x, max_x, min_y, max_y } = sudokuObject.getSudokuGroups(group)
    let array = []
    for (let i = min_y; i <= max_y; i++) {
        for (let j = min_x; j <= max_x; j++) {
            array.push({ row: i, column: j, group: group })
        }
    }

    return array
}

// Represents 3x3 square
export default function TileGroup(props) {
    const { setSelected, selected, group } = props
    const [tilesArray, setTilesArray] = useState([])

    useEffect(() => {
        setTilesArray(calculateTilesValues(group))

        return () => { }
    }, [group])

    return (
        <div className='tile-group'>
            {tilesArray.map((element, key) => {
                return <Tile key={key} group={group} setSelected={setSelected} selected={selected} row={element.row} column={element.column} />
            })}
        </div>
    )
}