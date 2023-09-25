import React from "react"

interface Props {
    placeholer: string
    type: string
}

const InputWithLabel = ({ placeholer, type }: Props) => {
    return (
        <input
            type={type}
            placeholder={placeholer}
            className="h-[40px] w-[360px] rounded-lg border-2 border-neutral-300 bg-neutral-200 p-[5px] placeholder:text-[18px] placeholder:font-normal placeholder:text-secondaryBlack/80"
        />
    )
}

export default InputWithLabel
