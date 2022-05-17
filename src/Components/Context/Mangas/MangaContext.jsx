import { createContext, useReducer } from "react";
import mangaReducer from "./MangaReducer";

const MangaContext = createContext();

export function MangaProvider({ children }) {
    const initialState = {
        loading: false,
        mangas: [],
        manga: {
            name: "",
            chapters: [],
            banner: "",
            bannerSmall: "",
            others: {
                synopsis: "",
                tags: [],
            },
            rating: {
                totalRating: null,
                totalUsers: null,
            },
            status: null,
        },
        pages: [],
    };
    const [state, dispatch] = useReducer(mangaReducer, initialState);

    return (
        <MangaContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </MangaContext.Provider>
    );
}

export default MangaContext;
