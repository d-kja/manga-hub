const SearchContext = (state, action) => {
    switch (action.type) {
        case "SET_LOADING_Q":
            return {
                ...state,
                loading: true,
            };
        case "QUERY_MANGA":
            return {
                ...state,
                loading: false,
                queryResult: action.payload,
            };

        default:
            return state;
    }
};

export default SearchContext;
