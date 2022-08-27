import { updateCartOnDB } from "../../adapters/cart"
import { ADD_TO_CART, DECREASE_SINGLE_QUANTITY, INCREASE_SINGLE_QUANTITY, REFRESH_CART, REMOVE_FROM_CART, UPDATE_TO_CART } from "./cartTypes"

export const addToCart =(data) => {
  return{
    type: ADD_TO_CART,
    payload: data
  }
}

export const removeFromCart =(data) => {
  return{
    type: REMOVE_FROM_CART,
    payload: data
  }
}

export const increaseSingleQuantity = (data) => {
  return{
    type: INCREASE_SINGLE_QUANTITY,
    payload: data
  }
}

export const decreaseSingleQuantity = (data) => {
  return{
    type: DECREASE_SINGLE_QUANTITY,
    payload: data
  }
}

export const updateCart =(data) => { 
  return{
    type: UPDATE_TO_CART,
    payload: data
  }
}

export const incQuantity = (cart, item, dispatch) => {
  const incData = cart?.items?.map(product => {
    if(product?.slug == item?.slug){
      return{...product, quantity: parseInt(product.quantity)+1}
    }else{
      return product
    }
  })
  
  updateCartOnDB(cart?._id, {...cart, items: incData})
  .then(response => {
    dispatch(updateCart(response.data))
  })
}

export const decQuantity = (cart, item, dispatch) => {
  const decData = cart?.items?.map(product => {
    if(product?.slug == item?.slug){
      return{...product, quantity: parseInt(product.quantity)-1}
    }else{
      return product
    }
  })

  updateCartOnDB(cart?._id, {...cart, items: decData})
  .then(response => {
    dispatch(updateCart(response.data))
  })
}

export const updateCartItemQuantity = (cart, item, qty, dispatch) => {
  const decData = cart?.items?.map(product => {
    if(product?.slug == item?.slug){
      return{...product, quantity: parseInt(qty)}
    }else{
      return product
    }
  })

  updateCartOnDB(cart?._id, {...cart, items: decData})
  .then(response => {
    dispatch(updateCart(response.data))
  })
}

export const updateCartItem = (cart, item, qty, dispatch) => {
  const decData = cart?.items?.map(product => {
    if(product?.slug == item?.slug){
      return{...product, quantity: parseInt(qty)}
    }else{
      return product
    }
  })

  updateCartOnDB(cart?._id, {...cart, items: decData})
  .then(response => {
    dispatch(updateCart(response.data))
  })
}



export const removeItem = (cart, item, dispatch) => {
  const rmData = cart?.items?.filter(product => product?.slug != item?.slug)

  updateCartOnDB(cart?._id, {...cart, items: rmData})
  .then(response => {
    dispatch(updateCart(response.data))
  })
}