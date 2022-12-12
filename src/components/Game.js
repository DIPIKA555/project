import React, { useState } from 'react'
import ExitModal from './ExitModal'

function Badge(props) {
  return (
    <span className='badge'>1</span>
  )
}

function ToolControl(props) {
  const { setOpened } = props
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
        <button className='button button-primary'>
          <Badge />
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
    return <button className='button button-outline-primary solid' key={index + 1}>{index + 1}</button>
  })

  return (
    <div className='numbers-keyboard'>
      {buttons}
    </div>
  )
}

function Tile(props) {
  const { number } = props

  return (
    <div className='board-tile'>
      <h4>{number}</h4>
    </div>
  )
}

// Represents 3x3 square
function TileGroup() {
  let tiles = Array.from({ length: 9 }, (_, index) => {
    return <Tile number={index} key={index} />
  })

  return (
    <div className='tile-group'>
      {tiles}
    </div>
  )
}

function Board(props) {
  let groups = Array.from({ length: 9 }, (_, index) => {
    return <TileGroup key={index} />
  })

  return (
    <div className='board-wrapper'>
      <div className='board-grid'>
        {groups}
      </div>
    </div>
  )
}

function Game(props) {
  const [opened, setOpened] = useState(false)    // Set exit modal opened
  return (
    <>
      <div className='container game-wrapper'>
        <div className='board-container'>
          <div className='app-header accent-font'>
            <h2>Sudoku</h2>
          </div>
          <div className='interactable-wrapper'>
            <Board />
            <div className=''>
              <ToolControl setOpened={setOpened} />
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