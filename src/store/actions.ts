import { Actions, IUser, IActionSetUser } from "../types";

export const setUserAction = (payload: IUser | null): IActionSetUser => ({
  type: Actions.setUser,
  payload,
});
