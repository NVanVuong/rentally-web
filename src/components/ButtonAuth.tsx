interface Props {
    text: string
    disabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
    onClick?: () => void
}

const ButtonAuth = ({ text, type, disabled, onClick }: Props) => {
    return (
        <button
            disabled={disabled}
            type={type}
            className="h-[38px] w-[360px] rounded-[6px] bg-secondary1 text-[20px] text-white hover:bg-orange-500"
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default ButtonAuth
