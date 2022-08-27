import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, SET_USER_DATA } from "./userTypes"

const initialState = {
  loading: false,
  data: null,
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_USER_DATA: return {
      ...state,
      data: action.payload
    }
    default: return state
  }
}