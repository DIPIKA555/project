import React from 'react'
import { useNavigate } from 'react-router-dom'

function GameOverModal(props) {
    const { opened } = props
    const navigate = useNavigate()

    return (
        <div className={opened ? 'modal-overlay opened' : 'modal-overlay'}>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>Game Over</h3>
                    <p className='helper-text dark'>
                        You have made 3 mistakes and lost this game
                    </p>
                </div>
                <div className='modal-action'>
                    <button className='button button-secondary' onClick={() => { navigate('/') }}>
                        Back to menu
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameOverModal