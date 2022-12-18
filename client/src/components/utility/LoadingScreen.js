import React from 'react'

function LoadingScreen(props) {
    const { loading, funFact } = props

    return (
        <div className={loading ? 'loader-wrapper visible' : 'loader-wrapper'}>
            <span className='overlay'></span>
            <div className='loader-content'>
                <h3 className='accent-font'>Loading</h3>
                <p>{funFact}</p>
                <span className='loader'></span>
            </div>
        </div>
    )
}

export default LoadingScreen