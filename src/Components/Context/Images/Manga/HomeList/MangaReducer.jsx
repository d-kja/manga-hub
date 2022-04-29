const mangaReducer = (state, action) => {
    switch (action.type) {
        case "SET_MANGAS":
            return {
                ...state,
                loading: false,
                mangas: action.payload,
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};

export default mangaReducer;
