import React from "react"
import Select from "react-select"

/*
    Here i'm setting the type to any because I can't quite remember the type it's receiving
    If I do recall it I'll change right away.
*/

const customStyles = {
    menu: (provided: any, state: any) => ({
        ...provided,
        borderBottom: "1px dotted red",
        color: "white",
    }),
    singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0.5 : 1
        const transition = "opacity 300ms"

        return { ...provided, opacity, transition }
    },
}

const options = [
    { value: "adventure", label: "Adventure" },
    { value: "fantasy", label: "Fantasy" },
    { value: "action", label: "Action" },
]

const ReactSelect = ({ setItems }: any) => {
    return (
        <Select
            options={options}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary25: "#292524",
                    primary: "#DA0037",
                    neutral0: "#292524",
                    neutral80: "white",
                    neutral10: "#171717",
                },
            })}
            isMulti
            styles={customStyles}
            onChange={setItems}
        />
    )
}

export default ReactSelect
