const express = require('express')
const { generate, generateSudoku, copyBoard } = require('./sudoku')
const app = express()

app.get('/', (req, res) => {
    res.send('Sudoku API')
})

app.get('/get-sudoku', (req, res) => {
    let filledBoard = generate()                        // Generate filled board
    let referenceBoard = generateSudoku(2)              // Create empty fields -> reference board
    let playableBoard = copyBoard(referenceBoard)       // Create playable board based on the reference board -> playableBoard

    res.status(200).send({ filledBoard: filledBoard, referenceBoard: referenceBoard, playableBoard: playableBoard })
})

app.get('*', (req, res) => {
    res.status(404).send('Route does not exist')
})

app.listen(5000, () => {
    console.log('App listening at http://localhost:5000')
})