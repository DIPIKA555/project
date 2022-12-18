import React from 'react'
import Badge from './utility/Badge'

export default function ToolControl(props) {
    const { setOpened, hintCount, useHint } = props
    return (
        <div className='tool-control'>
            <div className='button-desc'>
                <button onClick={() => { setOpened(true) }} className='button button-primary'>
                    <i className="bi bi-box-arrow-left"></i>
                </button>
                <p>Exit</p>
            </div>
            <div className='button-desc'>
                <button className='button button-primary'>
                    <i className="bi bi-eraser"></i>
                </button>
                <p>Erase</p>
            </div>
            <div className='button-desc'>
                <button className='button button-primary'>
                    <i className="bi bi-arrow-counterclockwise"></i>
                </button>
                <p>Undo</p>
            </div>
            <div className='button-desc'>
                <button onClick={useHint} className={hintCount > 0 ? 'button button-primary' : 'button button-primary disabled'}>
                    <Badge number={hintCount} />
                    <i className="bi bi-lightbulb"></i>
                </button>
                <p>Hint</p>
            </div>
        </div>
    )
}