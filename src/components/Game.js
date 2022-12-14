import React, { useEffect, useState } from 'react'
import Badge from './Badge'
import ExitModal from './ExitModal'
import { sudoku, sudokuGroups } from '../constants/sudoku'

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
  let buttons = Array.from({ length: 9 }, (_, index) => {
    return <button className='button button-outline-primary solid' key={index}>{index}</button>
  })

  return (
    <div className='numbers-keyboard'>
      {buttons}
    </div>
  )
}

function Tile(props) {
  const { setSelected, selected, x, y, group } = props

  const [value, setValue] = useState(sudoku[x][y])
  const [current, setCurrent] = useState(false)

  useEffect(() => {
    setCurrent(selected.x === x && selected.y === y)

    return () => { }
  }, [selected, x, y])

  const handleClick = () => {
    setSelected({ y: y, x: x })
  }

  return (
    <div className={current ? 'board-tile selected' : 'board-tile'} onClick={handleClick}>
      <h4>{value}</h4>
    </div>
  )
}

const calculateTilesValues = (group) => {
  const { min_x, max_x, min_y, max_y } = sudokuGroups[group]
  let array = []
  for (let i = min_y; i <= max_y; i++) {
    for (let j = min_x; j <= max_x; j++) {
      array.push({ x: i, y: j })
    }
  }

  return array
}

// Represents 3x3 square
function TileGroup(props) {
  const { setSelected, selected, group } = props
  const [tilesArray, setTilesArray] = useState([])
  
  useEffect(() => {
    setTilesArray(calculateTilesValues(group))

    return () => { }
  }, [group])

  return (
    <div className='tile-group'>
      {tilesArray.map((element, key) => {
        return <Tile group={group} key={key} setSelected={setSelected} selected={selected} x={element.x} y={element.y} />
      })}
    </div>
  )
}

function Board(props) {
  const { setSelected, selected } = props

  return (
    <div className='board-wrapper'>
      <div className='board-grid'>
        {Array.from({ length: 9 }, (_, index) => {
          return <TileGroup setSelected={setSelected} selected={selected} group={index} key={index} />
        })}
      </div>
    </div>
  )
}

function Game(props) {
  const [opened, setOpened] = useState(false)     // Set exit modal opened
  const [hintCount, setHintCount] = useState(1)   // Remaining hints count
  const [selected, setSelected] = useState({ x: -1, y: -1 })

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
            <Board setSelected={setSelected} selected={selected} />
            <div className=''>
              <ToolControl hintCount={hintCount} useHint={useHint} setOpened={setOpened} />
              <NumberControl />
            </div>
          </div>
        </div>
      </div>
      <ExitModal opened={opened} setOpened={setOpened} />
    </>
  )
}

export default Game