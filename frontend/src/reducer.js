// reducer.js

const reducer = (state, action) => {
    switch (action.type) {
      // ... other cases
  
      case 'USER_SIGNOUT':
        return {
          ...state,
          userInfo: null,
        };
  
      case 'CART_RESET':
        return {
          ...state,
          cart: {
            cartItems: [],
            shippingAddress: {},
            paymentMethod: '',
          },
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  