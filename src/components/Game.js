import React, { useEffect, useState } from 'react'
import Badge from './Badge'
import ExitModal from './ExitModal'
import { sudokuObject } from '../constants/sudoku'


function ToolControl(props) {
  const { setOpened, hintCount, useHint } = props
  return (
    <div className='tool-control'>
      <div className='button-desc'>
        <button onClick={() => { setOpened(true) }} className='button button-primary'>
          <i className="bi bi-box-arrow-left"></i>
        </button>
        <p>Exit</p>
      </div>
      <div className='button-desc'>
        <button className='button button-primary'>
          <i className="bi bi-eraser"></i>
        </button>
        <p>Erase</p>
      </div>
      <div className='button-desc'>
        <button className='button button-primary'>
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
        <p>Undo</p>
      </div>
      <div className='button-desc'>
        <button onClick={useHint} className={hintCount > 0 ? 'button button-primary' : 'button button-primary disabled'}>
          <Badge number={hintCount} />
          <i className="bi bi-lightbulb"></i>
        </button>
        <p>Hint</p>
      </div>
    </div>
  )
}

// Numbers section user can choose from
function NumberControl(props) {
  const { sudokuBoard, setSudokuBoard, selected } = props

  const updateValue = (value) => {
    sudokuObject.getSudoku()[selected.row][selected.column] = value
    selected.setValue(sudokuObject.getSudoku()[selected.row][selected.column])
    setSudokuBoard(sudokuObject.getSudoku())
  }

  let buttons = Array.from({ length: 9 }, (_, index) => {
    return <button onClick={() => updateValue(index)} className='button button-outline-primary solid' key={index}>{index}</button>
  })

  return (
    <div className='numbers-keyboard'>
      {buttons}
    </div>
  )
}

function Tile(props) {
  const { setSelected, selected, row, column, group } = props

  const [value, setValue] = useState(sudokuObject.getSudoku()[row][column])
  const [current, setCurrent] = useState(false)
  const [inline, setInline] = useState(false)

  useEffect(() => {
    setCurrent(selected.row === row && selected.column === column)
    setInline(selected.row === row || selected.column === column || selected.group === group)

    return () => { }
  }, [selected, row, column, group])

  const handleClick = () => {
    setSelected({ row: row, column: column, group: group, setValue })
  }

  return (
    <div className={current ? 'board-tile selected' : (inline ? 'board-tile inline' : 'board-tile')} onClick={handleClick}>
      <h4>{value !== 0 ? value : ' '}</h4>
    </div>
  )
}

const calculateTilesValues = (group) => {
  const { min_x, max_x, min_y, max_y } = sudokuObject.getSudokuGroups()[group]
  let array = []
  for (let i = min_y; i <= max_y; i++) {
    for (let j = min_x; j <= max_x; j++) {
      array.push({ row: i, column: j, group: group })
    }
  }

  return array
}

// Represents 3x3 square
function TileGroup(props) {
  const { setSelected, selected, group, sudokuBoard } = props
  const [tilesArray, setTilesArray] = useState([])
  
  useEffect(() => {
    setTilesArray(calculateTilesValues(group))

    return () => { }
  }, [group])

  return (
    <div className='tile-group'>
      {tilesArray.map((element, key) => {
        return <Tile key={key} sudokuBoard={sudokuBoard} group={group} setSelected={setSelected} selected={selected} row={element.row} column={element.column} />
      })}
    </div>
  )
}

function Board(props) {
  const { setSelected, selected, sudokuBoard } = props

  return (
    <div className='board-wrapper'>
      <div className='board-grid'>
        {Array.from({ length: 9 }, (_, index) => {
          return <TileGroup sudokuBoard={sudokuBoard} setSelected={setSelected} selected={selected} group={index} key={index} />
        })}
      </div>
    </div>
  )
}

function Game(props) {
  const [opened, setOpened] = useState(false)     // Set exit modal opened
  const [hintCount, setHintCount] = useState(1)   // Remaining hints count
  const [selected, setSelected] = useState({ row: -1, column: -1, group: -1, setValue: ()  => {} })

  const [sudokuBoard, setSudokuBoard] = useState(sudokuObject.getSudoku())

  const useHint = () => {
    if (hintCount > 0) { setHintCount(prev => prev - 1) }
  }

  return (
    <>
      <div className='container game-wrapper'>
        <div className='board-container'>
          <div className='app-header accent-font'>
            <h2>Sudoku</h2>
          </div>
          <div className='interactable-wrapper'>
            <Board sudokuBoard={sudokuBoard} setSelected={setSelected} selected={selected} />
            <div className=''>
              <ToolControl hintCount={hintCount} useHint={useHint} setOpened={setOpened} />
              <NumberControl setSudokuBoard={setSudokuBoard} sudokuBoard={sudokuBoard} selected={selected} />
            </div>
          </div>
        </div>
      </div>
      <ExitModal opened={opened} setOpened={setOpened} />
    </>
  )
}

export default Game