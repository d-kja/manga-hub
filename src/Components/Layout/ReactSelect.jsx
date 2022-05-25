import React from "react";
import Select from "react-select";

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted red",
        color: "white",
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";

        return { ...provided, opacity, transition };
    },
};

const options = [
    { value: "adventure", label: "Adventure" },
    { value: "fantasy", label: "Fantasy" },
    { value: "action", label: "Action" },
];

const ReactSelect = ({ setItems }) => {
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
    );
};

export default ReactSelect;
