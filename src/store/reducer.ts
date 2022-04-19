import { IState, Actions, IActionSetUser } from "../types";

const initialState: IState = {
  user: null,
};

export const reducer = (
  state: IState = initialState,
  action: IActionSetUser
): IState => {
  switch (action.type) {
    case Actions.setUser: {
      const user = action.payload;
      return {
        ...state,
        user,
      };
    }
    default:
      return state;
  }
};
