import React from "react"
import Stats from "./components/Stats"
import useLocalStorage from "./hooks/useLocalStorage"

function GameMode() {
  const [gameMode, setGameMode] = useLocalStorage('game-mode', 0)

  return (
    <>
      <div className="helper-text">
        <p>Select game mode</p>
      </div>
      <div className="button-wrapper">
        <button onClick={() => setGameMode(0)} className={gameMode === 0 ? "button button-outline-primary easy selected" : "button button-outline-primary easy"}>Easy</button>
        <button onClick={() => setGameMode(1)} className={gameMode === 1 ? "button button-outline-primary medium selected" : "button button-outline-primary medium"}>Medium</button>
        <button onClick={() => setGameMode(2)} className={gameMode === 2 ? "button button-outline-primary hard selected" : "button button-outline-primary hard"}>Hard</button>
        <button className="button button-primary">Start game</button>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="container">
      <span className="overlay"></span>
      <header className="app-header">
        <h1 className="headline">SUPER SUDOKU</h1>
        <GameMode />
      </header>
      <Stats />
    </div>
  )
}

export default App