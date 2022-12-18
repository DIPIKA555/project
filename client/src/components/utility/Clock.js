import React, { useCallback, useEffect, useState } from 'react'

function Clock(props) {
    const { loading } = props

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const getTime = useCallback(() => {
        if(seconds < 59) {
            setSeconds(prev => prev + 1)
        } else {
            setSeconds(0)
            if(minutes < 59) {
                setMinutes(prev => prev + 1)
            } else {
                setMinutes(0)
                setHours(prev => prev + 1)
            }
        }
    }, [minutes, seconds])
    
    useEffect(() => {
        if(!loading) {
            const interval = setInterval(() => {
                getTime()
            }, 1000)
            
            return () => {
                clearInterval(interval)
            }
        }

    }, [hours, minutes, seconds, getTime, loading])

    return (
        <div className='clock-wrapper'>
            <h4>{hours !== 0 ? hours + ':' : ''}{minutes}:{seconds.toString().length === 1 ? '0' + seconds : seconds}</h4>
        </div>
    )
}

export default Clock