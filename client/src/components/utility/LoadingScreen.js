import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoadingScreen(props) {
    const { loading, funFact } = props

    const navigate = useNavigate()

    return (
        <div className={loading ? 'loader-wrapper visible' : 'loader-wrapper'}>
            <span className='overlay'></span>
            <div className='loader-content'>
                <button className='button plain' onClick={() => navigate('/')}>
                    <i className='bi bi-arrow-clockwise'></i>
                </button>
                <h3 className='accent-font'>Loading</h3>
                <p>{funFact}</p>
                <span className='loader'></span>
            </div>
        </div>
    )
}

export default LoadingScreen