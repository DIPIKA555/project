import React from 'react'

function Badge(props) {
    const { number } = props
    return (
        <span className='badge'>{number}</span>
    )
}

export default Badge