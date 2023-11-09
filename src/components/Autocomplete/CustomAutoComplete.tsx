import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"

interface CustomAutoCompleteProps<T> {
    selectedOption: T | null
    options: T[]
    setSelectedOption: React.Dispatch<React.SetStateAction<T | null>>
}

export default function CustomAutoComplete<T>({
    options,
    selectedOption,
    setSelectedOption
}: CustomAutoCompleteProps<T>) {
    const handleChange = (_: any, value: T | null) => {
        setSelectedOption(value)
    }

    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={options}
            autoHighlight
            value={selectedOption}
            onChange={handleChange}
            getOptionLabel={(option: any) =>
                "province_name" in option ? option.province_name : option.district_name || ""
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password" // disable autocomplete and autofill
                    }}
                />
            )}
        />
    )
}
