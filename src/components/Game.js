import React, { useEffect, useRef, useState } from 'react'
import ExitModal from './utility/ExitModal'
import ToolControl from './ToolControl'
import NumberControl from './NumberControl'
import TileGroup from './TileGroup'
import LoadingScreen from './utility/LoadingScreen'
import { funFacts } from '../constants/sudoku'

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
  const [selected, setSelected] = useState({ row: -1, column: -1, group: -1, setValue: ()  => {}, value: -1 })

  const useHint = () => {
    if (hintCount > 0) { setHintCount(prev => prev - 1) }
  }

  const factIndex = useRef((Math.random() * (funFacts.length - 1)).toFixed(0))

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      <LoadingScreen loading={loading} funFact={funFacts[parseInt(factIndex.current)]} />
      <div className='container game-wrapper'>
        <div className='board-container'>
          <div className='app-header accent-font'>
            <h2>Sudoku</h2>
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