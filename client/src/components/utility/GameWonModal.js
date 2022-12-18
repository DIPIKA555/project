import React from 'react'
import { useNavigate } from 'react-router-dom'

function GameWonModal(props) {
    const { opened, hours, minutes, seconds } = props
    const navigate = useNavigate()

    return (
        <div className={opened ? 'modal-overlay opened' : 'modal-overlay'}>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>Level completed</h3>
                    <p className='helper-text dark'>
                        You've solved this puzzle in {hours !== 0 ? hours + ':' : ''}{minutes}:{seconds.toString().length === 1 ? '0' + seconds : seconds}
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

export default GameWonModal