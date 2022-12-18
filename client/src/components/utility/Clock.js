import React, { useCallback, useEffect } from 'react'

function Clock(props) {
    const { modalOpened, loading, hours, setHours, minutes, setMinutes, seconds, setSeconds } = props

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
        if(!loading && !modalOpened) {
            const interval = setInterval(() => {
                getTime()
            }, 1000)
            
            return () => {
                clearInterval(interval)
            }
        }

    }, [hours, minutes, seconds, getTime, loading, modalOpened])

    return (
        <div className='clock-wrapper'>
            <h4>{hours !== 0 ? hours + ':' : ''}{minutes}:{seconds.toString().length === 1 ? '0' + seconds : seconds}</h4>
        </div>
    )
}

export default Clock