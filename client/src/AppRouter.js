import React, { useMemo, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import App from './App'
import Stats from './components/Stats'
import Game from './components/Game'
import { funFacts, setBoard } from './constants/sudoku'

function AppRouter() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const funFactIndex = useMemo(() => parseInt(Math.random() * funFacts.length), [])

    const [selected, setSelected] = useState({ row: -1, column: -1, group: -1, setValue: () => { }, value: -1, setCorrect: () => {} })
    const [mistakes, setMistakes] = useState(0)

    const startGame = () => {
        setLoading(true)
        setMistakes(0)
        setSelected({ row: -1, column: -1, group: -1, setValue: () => { }, value: -1, setCorrect: () => {} })
        navigate('/game')
        fetch('/get-sudoku?' + new URLSearchParams({ gameMode: window.localStorage.getItem('game-mode') }), { method: 'GET' }).then(response => response.json()).then(data => {
            setBoard(data.filledBoard, data.referenceBoard, data.playableBoard)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
    }

    const routes = [
        {
            path: '/',
            element: <App startGame={startGame} loading={loading} setLoading={setLoading} />
        },
        {
            path: '/stats',
            element: <Stats />
        },
        {
            path: '/game',
            element: <Game selected={selected} setSelected={setSelected} mistakes={mistakes} setMistakes={setMistakes} funFactIndex={funFactIndex} loading={loading} setLoading={setLoading} />
        }
    ]

    return (
        <Routes>
            {routes.map((route, key) =>
                <Route key={key} path={route.path} element={route.element} />
            )}
        </Routes>
    )
}

export default AppRouter