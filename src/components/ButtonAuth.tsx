import React from "react"

interface Props {
    text: string
    onClick: () => void
}

const ButtonAuth = ({ text, onClick }: Props) => {
    return (
        <button className="h-[38px] w-[360px] rounded-[6px] bg-secondary1 text-[20px] text-white" onClick={onClick}>
            {text}
        </button>
    )
}

export default ButtonAuth
