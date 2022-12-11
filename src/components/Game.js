import React from 'react'

function ToolControl(props) {
  <div className=''>

  </div>
}

// Numbers section user can choose from
function NumberControl(props) {
  let buttons = Array.from({length: 9}, (_, index) => {
    return <button className='button button-outline-primary solid' key={index + 1}>{index + 1}</button>
  })

  return (
    <div className='button-wrapper flex filled'>
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
  let tiles = Array.from({length: 9}, (_, index) => {
    return <Tile number={index} key={index} />
  })

  return (
    <div className='tile-group'>
      {tiles}
    </div>
  )
}

function Board(props) {
  let groups = Array.from({length: 9}, (_, index) => {
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
  return (
    <div className='container column'>
      <span className='overlay'></span>
      <header className="app-header">
        <h1 className="headline accent-font">Sudoku</h1>
      </header>
      <Board />
      <NumberControl />
    </div>
  )
}

export default Game