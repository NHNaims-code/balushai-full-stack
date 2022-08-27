import { SET_USER_DATA } from "./userTypes"

export const setUserData = (data) => {
  return{
    type: SET_USER_DATA,
    payload: data
  }
}
