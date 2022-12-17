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

const emptySudoku = () => {
    return Array.from({ length: 9 }, () => [0, 0, 0, 0, 0, 0, 0, 0, 0])
}

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
        const _sudoku_groups = defaultSudokuGroups
        this.level = 0

        // Sudoku board than user can and will modify
        let _sudoku = emptySudoku()

        // Properly solved sudoku board
        // this board does not contain empty fields
        let _filled_sudoku = emptySudoku()

        // Sudoku board that is a reference to whitch fields were filled by default
        // and which were not (this board contains empty fields)
        let _reference_sudoku = emptySudoku()

        this.getSudoku = function () {
            return _sudoku
        }

        this.getReferenceSudoku = function () {
            return _reference_sudoku
        }

        this.getFilledSudoku = function () {
            return _filled_sudoku
        }

        this.getSudokuGroups = function (group) {
            /**
             * Returns 3x3 square boundaries based on group index
             */

            return _sudoku_groups[group]
        }

        this.copySudoku = function (sudokuArray) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    sudokuArray[i][j] = _sudoku[i][j]
                }
            }
        }

        this.start = async function (level) {
            return new Promise((resolve, reject) => {
                this.level = level
                this.createSeed()
                this.solveSudoku(0, 0)
                this.copySudoku(_filled_sudoku)

                this.generateSudoku(level)
                this.copySudoku(_reference_sudoku)
                resolve(true)
            })
        }
    }

    checkEditableField(row, column) {
        /**
         * Returns true if field can be modified
         */

        return (this.getReferenceSudoku()[row][column] === 0)
    }

    changeValue(row, column, newValue) {
        /**
         * Changes field value if possible
         */

        if (this.checkEditableField(row, column)) {
            this.getSudoku()[row][column] = newValue
        }
    }

    getValue(row, column) {
        try {
            return this.getSudoku()[row][column]
        } catch (e) {
            return -1
        }
    }

    isSafe(row, column, value) {
        for (let i = 0; i < 9; i++) {
            if (this.getSudoku()[row][i] === value) return false
        }

        for (let i = 0; i < 9; i++) {
            if (this.getSudoku()[i][column] === value) return false
        }

        let startRow = row - row % 3
        let startColumn = column - column % 3

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.getSudoku()[i + startRow][j + startColumn] === value) return false
            }
        }

        return true
    }

    solveSudoku(row, column) {
        if (row === 8 && column === 9) return true
        if (column === 9) {
            row += 1
            column = 0
        }

        if (this.getSudoku()[row][column] > 0) return this.solveSudoku(row, column + 1)

        for (let i = 1; i <= 9; i++) {
            if (this.isSafe(row, column, i)) {
                this.getSudoku()[row][column] = i

                if (this.solveSudoku(row, column + 1)) return true
            }

            this.getSudoku()[row][column] = 0
        }

        return false
    }

    getRandom(floor, limit) {
        return (Math.random() * (limit - 1) + floor).toFixed(0)   // random number in range from 1 to $limit
    }

    createSeed() {
        let counter = 0

        while (counter < 20) {
            let randomRow = this.getRandom(0, 9)
            let randomColumn = this.getRandom(0, 9)
            let randomValue = this.getRandom(1, 9)

            if (this.isSafe(randomRow, randomColumn, parseInt(randomValue))) {
                this.getSudoku()[randomRow][randomColumn] = parseInt(randomValue)
                counter += 1
            }
        }
    }

    countBlank() {
        let counter = 0
        for (let i; i < 9; i++) {
            for (let j; j < 9; j++) {
                if (this.getSudoku()[i][j] === 0) {
                    counter += 1
                }
            }
        }

        return counter
    }

    generateSudoku(level) {
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
                blankFieldsCount = 40
                break
            case 1:
                blankFieldsCount = 50
                break
            case 2:
                blankFieldsCount = 60
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
            let randomRow = parseInt(this.getRandom(0, availablePositionsMap.size))
            let key = Array.from(availablePositionsMap.keys())[randomRow]
            let randomColumn = this.getRandom(0, availablePositionsMap.get(key).length)
            
            this.getSudoku()[randomRow][availablePositionsMap.get(key)[randomColumn]] = 0

            availablePositionsMap.get(key).splice(randomColumn, 1)

            if (availablePositionsMap.get(key).length === 0) {
                availablePositionsMap.delete(key)
            }
        }
    }
}

const sudoku = new sudokuClass()

export { sudoku as sudokuObject, funFacts }