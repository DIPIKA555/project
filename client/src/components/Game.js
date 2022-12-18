import React, { useEffect, useState } from 'react'
import ExitModal from './utility/ExitModal'
import ToolControl from './ToolControl'
import NumberControl from './NumberControl'
import TileGroup from './TileGroup'
import LoadingScreen from './utility/LoadingScreen'
import { changeValue, funFacts, getHint } from '../constants/sudoku'
import useLocalStorage from '../hooks/useLocalStorage'
import Clock from './utility/Clock'
import GameOverModal from './utility/GameOverModal'

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
  const { loading, funFactIndex, mistakes, setMistakes, selected, setSelected } = props
  const [opened, setOpened] = useState(false)     // Set exit modal opened
  const [gameOver, setGameOver] = useState(false)
  const [hintCount, setHintCount] = useState(1)   // Remaining hints count

  const gameMode = useLocalStorage('game-mode', 0)

  const useHint = () => {
    if (hintCount > 0) { setHintCount(prev => prev - 1) }
    let correctValue = getHint(selected.row, selected.column)
    changeValue(selected.row, selected.column, correctValue, selected.setValue)
  }

  useEffect(() => {
    if(mistakes > 2) {
      setGameOver(true)
    }
  }, [mistakes])

  return (
    <>
      <LoadingScreen loading={loading} funFact={funFacts[funFactIndex]} />
      <div className='container game-wrapper'>
        <div className='board-container'>
          <div className='app-header accent-font'>
            <h2>Sudoku</h2>
            <div className='additional-info'>
              <h4 className={gameMode[0] === 0 ? 'font-green' : gameMode[0] === 1 ? 'font-yellow' : 'font-red'}>{gameMode[0] === 0 ? 'Easy' : gameMode[0] === 1 ? 'Medium' : 'Hard'}</h4>
              <div className='inner-wrapper'>
                <Clock loading={loading} />
                <h4>Mistakes: <span className={mistakes > 0 ? 'font-yellow' : ''}>{mistakes}</span>/3</h4>
              </div>
            </div>
          </div>
          <div className='interactable-wrapper'>
            <Board setSelected={setSelected} selected={selected} />
            <div>
              <ToolControl hintCount={hintCount} useHint={useHint} setOpened={setOpened} />
              <NumberControl setMistakes={setMistakes} setSelected={setSelected} selected={selected} />
            </div>
          </div>
        </div>
      </div>
      <ExitModal opened={opened} setOpened={setOpened} />
      <GameOverModal opened={gameOver} setOpened={setGameOver} />
    </>
  )
}

export default Game