import { createContext, useReducer } from "react";
import BannerReducer from "./BannerReducer";

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
    const initialState = {
        loading: true,
        banners: [],
    };
    const [state, dispatch] = useReducer(BannerReducer, initialState);
    return (
        <BannerContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </BannerContext.Provider>
    );
};

export default BannerContext;
