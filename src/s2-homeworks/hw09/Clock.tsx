import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        let id: number = +setInterval(() => {
            setDate(new Date(Date.now()))
        }, 1000)
        setTimerId(id)
    }

    const stop = () => {
        clearTimeout(timerId)
        setTimerId(undefined)
    }

    const onMouseEnter = () => { //  показать дату если наведена мышка
        setShow(true)
    }
    const onMouseLeave = () => {// спрятать дату если мышка не наведена
        setShow(false)
    }

    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1

    const stringTime = hours + ':' + minutes + ':' + seconds ||
        <br/>
    const stringDate = day + '.' + month + '.' + date.getFullYear() || <br/>
    const stringDay = new Intl.DateTimeFormat("en-US", {weekday: 'long'}).format(date) || <br/>
    const stringMonth = new Intl.DateTimeFormat("en-US", {month: 'long'}).format(date) || <br/>

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={typeof timerId === 'number'} //задизэйблить если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={typeof timerId !== 'number'}  // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
