import { State, Actions, ActionSetUser } from "../types";

const initialState: State = {
  user: null,
};

export default function reducer(
  state: State = initialState,
  action: ActionSetUser
): State {
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
}
