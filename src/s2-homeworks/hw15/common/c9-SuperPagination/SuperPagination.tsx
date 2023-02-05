import React, {ChangeEvent} from 'react'
import SuperSelect from '../../../hw07/common/c5-SuperSelect/SuperSelect'
import {Pagination} from '@mui/material'
import s from './SuperPagination.module.css'


export type SuperPaginationPropsType = {
    id?: string
    page: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = (
    {
        page, itemsCountForPage, totalCount, onChange, id = 'hw15',
    }
) => {
    const lastPage = Math.ceil(totalCount / itemsCountForPage)

    const onChangeCallback = (event: React.ChangeEvent<unknown>, page: number) => {
        onChange(page, itemsCountForPage)
    }

    const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(page, +event.currentTarget.value)
    }


    return (
        <div className={s.pagination}>
            <Pagination
                id={id + '-pagination'}
                sx={{
                    button: {
                        '&:hover': {
                            color: '#FFFFFF',
                            backgroundColor: '#0066CC',
                            borderRadius:'2px'
                        }
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        color: "white",
                        background: "#0066CC",
                        borderRadius:'2px',
                        "&:hover": {
                            color: "white",
                            background: "#0066CC",
                            borderRadius:'2px'
                        },
                    },
                }}
                page={page}
                count={lastPage}
                onChange={onChangeCallback}
                hideNextButton
                hidePrevButton
            />

            <span className={s.text1}>
                Show
            </span>

            <SuperSelect
                id={id + '-pagination-select'}
                value={itemsCountForPage}
                options={[
                    {id: 4, value: 4},
                    {id: 7, value: 7},
                    {id: 10, value: 10},
                ]}
                onChange={onChangeSelect}
                className={s.select}
            />

            <span className={s.text2}>
                rows in table
            </span>
        </div>
    )
}

export default SuperPagination
