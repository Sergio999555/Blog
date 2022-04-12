const initialState = {
  articles: [],
  loading: true,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_ARTICLES":
      return {
        ...state,
        articles: action.payload,
      };

    case "UPDATE_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
