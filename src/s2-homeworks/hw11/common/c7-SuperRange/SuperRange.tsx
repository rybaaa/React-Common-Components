import React from 'react'
import {Slider, SliderProps} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{ width: 300}}
            color="secondary"
            {...props}
        />
    )
}

export default SuperRange
