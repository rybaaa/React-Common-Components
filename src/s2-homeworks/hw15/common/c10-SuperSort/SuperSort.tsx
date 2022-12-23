import React from 'react'
import downIcon from '../../assert/downicon.svg'
import upIcon from '../../assert/upicon.svg'
import noneIcon from '../../assert/noneicon.svg'
import s from '../../HW15.module.css'

// добавить в проект иконки и импортировать


export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    switch (sort) {
        case '':
            return sort = down;
        case down:
            return sort = up;
        case up:
            return sort = ''
        default:
            return sort = down
    }
    // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon


    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            {<img className={s.icon} id={id + '-icon-' + sort} src={icon} alt={'sorted icon'}/>}
        </span>
    )
}

export default SuperSort
