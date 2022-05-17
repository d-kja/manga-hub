import { createContext, useReducer } from "react";
import SearchReducer from "./SearchReducer";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const initialState = {
        loading: false,
        queryResult: [],
    };
    const [state, dispatch] = useReducer(SearchReducer, initialState);
    return (
        <SearchContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;
