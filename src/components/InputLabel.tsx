import React from 'react'

interface Props {
    placeholer:string;

}

const InputWithLabel = ({placeholer}: Props) => {
    return (
        <input placeholder={placeholer} className='border boder-'  />
    )
}

export default InputWithLabel
