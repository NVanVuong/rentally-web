import { ChangeEvent } from "react"

interface Props {
    placeholer: string
    type: string
    name?: string
    id?: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputWithLabel = ({ placeholer, type, name, id, value, onChange }: Props) => {
    return (
        <input
            type={type}
            placeholder={placeholer}
            value={value}
            id={id}
            name={name}
            onChange={onChange}
            className="h-[40px] w-[360px] rounded-lg border-2 border-neutral-300 bg-neutral-200 p-[5px] placeholder:text-[18px] placeholder:font-normal placeholder:text-secondaryBlack/80 focus:border-secondary1 focus:bg-white focus:outline-none focus:ring-0"
        />
    )
}

export default InputWithLabel
