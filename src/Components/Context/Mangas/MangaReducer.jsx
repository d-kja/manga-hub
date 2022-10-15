const mangaReducer = (state, action) => {
  switch (action.type) {
    case "SET_MANGA":
      return {
        ...state,
        loading: false,
        manga: action.payload,
      }
    case "SET_MANGAS":
      return {
        ...state,
        loading: false,
        mangas: action.payload,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      }
    case "RESET_LOADING":
      return {
        ...state,
        loading: false,
      }
    case "SET_BANNERS":
      return {
        ...state,
        loading: false,
        banners: action.payload,
      }
    case "SET_PAGES":
      return {
        ...state,
        loading: false,
        pages: action.payload,
      }

    default:
      return state
  }
}

export default mangaReducer
