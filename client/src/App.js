import React from 'react'
import useLocalStorage from './hooks/useLocalStorage'

function GameMode(props) {
  const { startGame } = props
  const [gameMode, setGameMode] = useLocalStorage('game-mode', 0)

  return (
    <>
      <div className="helper-text">
        <p>Game Mode</p>
      </div>
      <div className="button-wrapper">
        <button onClick={() => setGameMode(0)} className={gameMode === 0 ? "button button-outline-primary easy selected" : "button button-outline-primary easy"}>Easy</button>
        <button onClick={() => setGameMode(1)} className={gameMode === 1 ? "button button-outline-primary medium selected" : "button button-outline-primary medium"}>Medium</button>
        <button onClick={() => setGameMode(2)} className={gameMode === 2 ? "button button-outline-primary hard selected" : "button button-outline-primary hard"}>Hard</button>
        <button className="button button-primary neon-button accent-font" onClick={startGame}>Start game</button>
      </div>
    </>
  )
}

function App(props) {
  const { startGame } = props
  return (
    <div className="container blur">
      <span className="overlay"></span>
      <header className="app-header">
        <h1 className="headline accent-font">Super Sudoku</h1>
        <GameMode startGame={startGame} />
      </header>
    </div>
  )
}

export default App