const BannerReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_BANNERS":
            return {
                ...state,
                banners: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};

export default BannerReducer;
