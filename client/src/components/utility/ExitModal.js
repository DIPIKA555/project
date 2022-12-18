import React from 'react'
import { useNavigate } from 'react-router-dom'

function ExitModal(props) {
    const { opened, setOpened } = props
    const navigate = useNavigate()

    return (
        <div className={opened ? 'modal-overlay opened' : 'modal-overlay'}>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>Do you really want to exit?</h3>
                    <p className='helper-text dark'>
                        All progress will be lost
                    </p>
                </div>
                <div className='modal-action'>
                    <button className='button button-danger' onClick={() => {  navigate('/') }}>
                        Exit
                    </button>
                    <button className='button button-secondary' onClick={() => { setOpened(false) }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ExitModal