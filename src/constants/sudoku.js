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

// Properly solved sudoku board
// this board does not contain empty fields
const filledSudoku = [
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 5, 1, 3, 4, 5, 6, 7, 8, 9 ],
    [ 3, 2, 3, 4, 5, 6, 7, 8, 9 ],
    
    [ 1, 2, 3, 9, 5, 6, 7, 8, 9 ],
    [ 1, 2, 7, 4, 5, 6, 7, 3, 9 ],
    [ 1, 4, 3, 4, 1, 6, 7, 8, 9 ],
    
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 1, 4, 3, 4, 5, 3, 7, 4, 9 ],
    [ 1, 2, 3, 2, 5, 4, 6, 8, 6 ]
]

// Sudoku board that is a reference to whitch fields were filled by default
// and which were not (this board contains empty fields)
const referenceSudoku = [
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 5, 1, 0, 4, 0, 6, 7, 0, 0 ],
    [ 3, 0, 3, 4, 0, 0, 7, 8, 0 ],
    
    [ 1, 2, 3, 0, 5, 6, 7, 8, 9 ],
    [ 1, 2, 7, 4, 5, 6, 7, 0, 9 ],
    [ 1, 0, 3, 4, 0, 6, 7, 8, 9 ],
    
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 1, 0, 3, 4, 5, 3, 7, 0, 9 ],
    [ 1, 2, 3, 2, 5, 4, 6, 8, 0 ]
]

// Sudoku board than user can and will modify
const defaultSudoku = [
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 5, 1, 0, 4, 0, 6, 7, 0, 0 ],
    [ 3, 0, 3, 4, 0, 0, 7, 8, 0 ],
    
    [ 1, 2, 3, 0, 5, 6, 7, 8, 9 ],
    [ 1, 2, 7, 4, 5, 6, 7, 0, 9 ],
    [ 1, 0, 3, 4, 0, 6, 7, 8, 9 ],
    
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 1, 0, 3, 4, 5, 3, 7, 0, 9 ],
    [ 1, 2, 3, 2, 5, 4, 6, 8, 0 ]
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

class sudokuClass {
    constructor() {
        this.sudoku = defaultSudoku
        this.filledSudoku = filledSudoku
        this.referenceSudoku = referenceSudoku

        this.sudokuGroups = defaultSudokuGroups
    }

    checkEditableField(row, column) {
        /**
         * Returns true if field can be modified
         */
    
        return (this.referenceSudoku[row][column] === 0)
    }

    setSudoku() {}

    getSudoku() {
        /**
         * Returns default sudoku array
         */

        return this.sudoku
    }

    changeValue(row, column, newValue) {
        /**
         * Changes field value if possible
         */

        if(this.checkEditableField(row, column)) {
            this.sudoku[row][column] = newValue
        }
    }

    getSudokuGroups(group) {
        /**
         * Returns 3x3 square boundaries based on group index
         */

        return this.sudokuGroups[group]
    }

    getValue(row, column) {
        try {
            return this.sudoku[row][column]
        } catch(e) {
            return -1
        }
    }
}

const sudokuObject = new sudokuClass()

export { sudokuObject, funFacts }