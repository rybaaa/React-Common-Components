import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW14.module.css'
import axios from 'axios'
import SuperDebouncedInput from './common/c8-SuperDebouncedInput/SuperDebouncedInput'
import {useSearchParams} from 'react-router-dom'

const getTechs = (find: string) => {
    return axios
        .get<{ techs: string[] }>(
            'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test2',
            {params: {find}}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW14 = () => {
    const [find, setFind] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<string[]>([])

    const sendQuery = (value: string) => {
        setLoading(true)
        getTechs(value)
            .then((res) => {
                if (res){
                    setTechs(res.data.techs)
                    setLoading(false)
                }
            })
    }

    const onChangeText = (value: string) => {
        setFind(value)
        setSearchParams(value)
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        console.log(params)
        sendQuery(params.find || '')
        setFind(params.find || '')
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t} id={'hw14-tech-' + t} className={s.tech}>
            {t}
        </div>
    ))

    return (
        <div id={'hw14'}>
            <div className={s2.hwTitle}>Homework #14</div>

            <div className={s2.hw}>
                <div className={s.wrapper}>
                    <SuperDebouncedInput
                        id={'hw14-super-debounced-input'}
                        value={find}
                        onChangeText={onChangeText}
                        onDebouncedChange={sendQuery}
                    />
                    <div id={'hw14-loading'} className={s.loading}>
                        {isLoading ? '...ищем' : <br/>}
                    </div>
                </div>
                {mappedTechs}
            </div>
        </div>
    )
}

export default HW14
