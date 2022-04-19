import { Actions, User, ActionSetUser } from "../types";

export const setUserAction = (payload: User | null): ActionSetUser => ({
  type: Actions.setUser,
  payload,
});
