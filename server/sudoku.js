const board = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],

    [2, 3, 1, 5, 6, 4, 8, 9, 7],
    [5, 6, 4, 8, 9, 7, 2, 3, 1],
    [8, 9, 7, 2, 3, 1, 5, 6, 4],

    [3, 1, 2, 6, 4, 5, 9, 7, 8],
    [6, 4, 5, 9, 7, 8, 3, 1, 2],
    [9, 7, 8, 3, 1, 2, 6, 4, 5]
]

function shuffleNumbers() {
    for (let i = 1; i <= 9; i++) {
        let ranNum = parseInt(Math.random() * 8 + 1)
        swapNumbers(i, ranNum)
    }
}

function swapNumbers(n1, n2) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (board[x][y] == n1) {
                board[x][y] = n2
            } else if (board[x][y] == n2) {
                board[x][y] = n1
            }
        }
    }
}

function shuffleRows() {
    let blockNumber

    for (let i = 0; i < 9; i++) {
        let ranNum = parseInt(Math.random() * 2)
        blockNumber = parseInt(i / 3)
        swapRows(i, blockNumber * 3 + ranNum)
    }
}

function swapRows(r1, r2) {
    let row = board[r1]
    board[r1] = board[r2]
    board[r2] = row
}

function shuffleCols() {
    let blockNumber

    for (let i = 0; i < 9; i++) {
        let ranNum = parseInt(Math.random() * 2)
        blockNumber = parseInt(i / 3)
        swapCols(i, blockNumber * 3 + ranNum)
    }
}

function swapCols(c1, c2) {
    let colVal
    for (let i = 0; i < 9; i++) {
        colVal = board[i][c1]
        board[i][c1] = board[i][c2]
        board[i][c2] = colVal
    }
}

function shuffle3X3Rows() {
    for (let i = 0; i < 3; i++) {
        let ranNum = parseInt(Math.random() * 2)
        swap3X3Rows(i, ranNum)
    }
}

function swap3X3Rows(r1, r2) {
    for (let i = 0; i < 3; i++) {
        swapRows(r1 * 3 + i, r2 * 3 + i)
    }
}

function shuffle3X3Cols() {
    for (let i = 0; i < 3; i++) {
        let ranNum = parseInt(Math.random() * 2 + 1)
        swap3X3Cols(i, ranNum)
    }
}

function swap3X3Cols(c1, c2) {
    for (let i = 0; i < 3; i++) {
        swapCols(c1 * 3 + i, c2 * 3 + i)
    }
}

function generate() {
    shuffleNumbers()
    shuffleRows()
    shuffleCols()
    shuffle3X3Cols()
    shuffle3X3Rows()

    return board
}

function copyBoard(sourceBoard) {
    let newBoard = []

    for(let i = 0; i < sourceBoard.length; i++) {
        newBoard[i] = sourceBoard[i].slice()
    }

    return newBoard
}

function generateSudoku(level) {
    let newBoard = copyBoard(board)

    /**
     * 
     * level Easy (0) -> 40 blankFields
     * level Medium (1) -> 50 blankFields
     * level Hard (2) -> 60 blankFields
     * 
    */

    let blankFieldsCount = 0
    switch (level) {
        case 0:
            blankFieldsCount = 10
            break
        case 1:
            blankFieldsCount = 40
            break
        case 2:
            blankFieldsCount = 48
            break

        default:
            break
    }

    let availablePositionsMap = new Map()
    availablePositionsMap.set(0, Array.from({ length: 9 }, (_, index) => index))
    availablePositionsMap.set(1, Array.from({ length: 9 }, (_, index) => index))
    availablePositionsMap.set(2, Array.from({ length: 9 }, (_, index) => index))
    availablePositionsMap.set(3, Array.from({ length: 9 }, (_, index) => index))
    availablePositionsMap.set(4, Array.from({ length: 9 }, (_, index) => index))
    availablePositionsMap.set(5, Array.from({ length: 9 }, (_, index) => index))
    availablePositionsMap.set(6, Array.from({ length: 9 }, (_, index) => index))
    availablePositionsMap.set(7, Array.from({ length: 9 }, (_, index) => index))
    availablePositionsMap.set(8, Array.from({ length: 9 }, (_, index) => index))

    for (let i = 0; i < blankFieldsCount; i++) {
        let randomRow = parseInt(Math.random() * availablePositionsMap.size)
        let key = Array.from(availablePositionsMap.keys())[randomRow]
        let randomColumn = parseInt(Math.random() * availablePositionsMap.get(key).length)

        newBoard[randomRow][availablePositionsMap.get(key)[randomColumn]] = 0

        availablePositionsMap.get(key).splice(randomColumn, 1)

        if (availablePositionsMap.get(key).length === 0) {
            availablePositionsMap.delete(key)
        }
    }

    return newBoard
}

module.exports = { generate, generateSudoku, copyBoard }