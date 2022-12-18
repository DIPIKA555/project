import React, { useState } from 'react'
import ExitModal from './utility/ExitModal'
import ToolControl from './ToolControl'
import NumberControl from './NumberControl'
import TileGroup from './TileGroup'
import LoadingScreen from './utility/LoadingScreen'
import { changeValue, funFacts, getHint } from '../constants/sudoku'
import useLocalStorage from '../hooks/useLocalStorage'
import Clock from './utility/Clock'

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
  const { loading, funFactIndex } = props
  const [opened, setOpened] = useState(false)     // Set exit modal opened
  const [hintCount, setHintCount] = useState(1)   // Remaining hints count
  const [selected, setSelected] = useState({ row: -1, column: -1, group: -1, setValue: ()  => {}, value: -1 })

  const gameMode = useLocalStorage('game-mode', 0)

  const useHint = () => {
    if (hintCount > 0) { setHintCount(prev => prev - 1) }
    let correctValue = getHint(selected.row, selected.column)
    changeValue(selected.row, selected.column, correctValue, selected.setValue)
  }

  return (
    <>
      <LoadingScreen loading={loading} funFact={funFacts[funFactIndex]} />
      <div className='container game-wrapper'>
        <div className='board-container'>
          <div className='app-header accent-font'>
            <h2>Sudoku</h2>
            <div className='additional-info'>
              <h4 className={gameMode[0] === 0 ? 'font-green' : gameMode[0] === 1 ? 'font-yellow' : 'font-red'}>{gameMode[0] === 0 ? 'Easy' : gameMode[0] === 1 ? 'Medium' : 'Hard'}</h4>
              <Clock loading={loading} />
            </div>
          </div>
          <div className='interactable-wrapper'>
            <Board setSelected={setSelected} selected={selected} />
            <div className=''>
              <ToolControl hintCount={hintCount} useHint={useHint} setOpened={setOpened} />
              <NumberControl setSelected={setSelected} selected={selected} />
            </div>
          </div>
        </div>
      </div>
      <ExitModal opened={opened} setOpened={setOpened} />
    </>
  )
}

export default Game