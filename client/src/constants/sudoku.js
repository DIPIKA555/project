const funFacts = [
    'Sudoku is based on an early mathematical analysis concept designed in 1782',
    'Sudoku only went viral in the Western world in 2004',
    'The very first Sudoku World Championships were hosted in 2006 in Italy',
    'One cannot complete all of the possible Sudoku puzzles in an entire lifetime',
    'Several celebrities have admitted to being addicted to Sudoku',
    'Many people mistakenly believe that Sudoku is a mathematical game, whereas it is actually a game of logic',
    'Sudoku is, arguably one of few good addictions to have',
    'The Guinness World Record for “the fastest time to complete a Sudoku is less than 1 minute and a half',
    'Since the original release of Sudoku, many variations of the game have been released',
    'The size of a Sudoku puzzle that can be created is unlimited',
    'Sudoku puzzles that have just one solution come with various clues for the player',
    'In the year following Sudoku going viral, pencil sales are said to have increased by around 700%',
]

const defaultSudokuGroups = {
    0: { min_x: 0, max_x: 2, min_y: 0, max_y: 2 },
    1: { min_x: 3, max_x: 5, min_y: 0, max_y: 2 },
    2: { min_x: 6, max_x: 8, min_y: 0, max_y: 2 },

    3: { min_x: 0, max_x: 2, min_y: 3, max_y: 5 },
    4: { min_x: 3, max_x: 5, min_y: 3, max_y: 5 },
    5: { min_x: 6, max_x: 8, min_y: 3, max_y: 5 },

    6: { min_x: 0, max_x: 2, min_y: 6, max_y: 8 },
    7: { min_x: 3, max_x: 5, min_y: 6, max_y: 8 },
    8: { min_x: 6, max_x: 8, min_y: 6, max_y: 8 }
}

let playableSudoku = Array.from({ length: 9 }, (_) => [0, 0, 0,  0, 0, 0,  0, 0, 0])
let referenceSudoku = Array.from({ length: 9 }, (_) => [0, 0, 0,  0, 0, 0,  0, 0, 0])
let filledSudoku = Array.from({ length: 9 }, (_) => [0, 0, 0,  0, 0, 0,  0, 0, 0])

const clearBoard = () => {
    playableSudoku = Array.from({ length: 9 }, (_) => [0, 0, 0,  0, 0, 0,  0, 0, 0])
    referenceSudoku = Array.from({ length: 9 }, (_) => [0, 0, 0,  0, 0, 0,  0, 0, 0])
    filledSudoku = Array.from({ length: 9 }, (_) => [0, 0, 0,  0, 0, 0,  0, 0, 0])
}

const setBoard = (filledBoard, referenceBoard, playableBoard) => {
    playableSudoku = playableBoard
    referenceSudoku = referenceBoard
    filledSudoku = filledBoard
}

const getSudokuGroups = (group) => {
    return defaultSudokuGroups[group]
}

const checkEditableField = (row, column) => {
    return referenceSudoku[row][column] === 0
}

const validateInput = (row, column) => {
    return (playableSudoku[row][column] === filledSudoku[row][column])
}

const changeValue = (row, column, newValue, callback) => {
    if (checkEditableField(row, column)) {
        console.log('Changing value: ', row, column, newValue)
        playableSudoku[row][column] = newValue
        callback(newValue)
    }
}

const getValue = (row, column) => {
    try {
        return playableSudoku[row][column]
    } catch (e) {
        return -1
    }
}

export {
    clearBoard,
    funFacts,
    setBoard,
    playableSudoku,
    getSudokuGroups,
    getValue,
    checkEditableField,
    changeValue
}