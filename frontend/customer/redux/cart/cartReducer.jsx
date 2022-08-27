import { updateCartOnDB } from "../../adapters/cart"
import { ADD_TO_CART, DECREASE_SINGLE_QUANTITY, INCREASE_SINGLE_QUANTITY, REMOVE_FROM_CART, UPDATE_TO_CART } from "./cartTypes"

const initialState = {
  loading: false,
  data: [],
  error: null
}

export const cartReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_TO_CART: return {
      ...state,
      data: [...state.data, action.payload]
    }

    case REMOVE_FROM_CART: 
    const newData = state.data.filter(product => product._id != action.payload._id)
    return {
      ...state,
      data: newData
    }

    case INCREASE_SINGLE_QUANTITY: 
      const increasedData = state.data?.items?.map(product => {
        if(product.slug == action.payload.slug){
          return{...product, quantity: parseInt(product.quantity)+1}
        }else{
          return product
        }
      })
      updateCartOnDB(state.data?._id, {...state.data, items: increasedData}).then(response => {
        if(response.data){}
        console.log("from redux: ", response.data)
      })
    return {
      ...state,
      data: {...state.data, items: increasedData}
    }

    case DECREASE_SINGLE_QUANTITY: 
      const decreaseData = state.data?.itmes?.map(product => {
        if(product.slug == action.payload.slug){
          return{...product, quantity: parseInt(product.quantity)-1}
        }else{
          return product
        }
      })
    return {
      ...state,
      data: decreaseData
    }

    case UPDATE_TO_CART:
      return {
        ...state,
        data: action.payload
      }
      
    default: return state
  }
}