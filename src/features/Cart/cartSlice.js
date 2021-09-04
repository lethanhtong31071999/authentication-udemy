const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isShowMiniCart: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    showMiniCart(state) {
      state.isShowMiniCart = true;
    },

    hideMiniCart(state) {
      state.isShowMiniCart = false;
    },

    addToCart(state, action) {
      // Payload is object with {idProduct, productObject, quantity}
      const newItem = action.payload;
      const existingIndex = state.cartItems.findIndex((item) => {
        return item.product.id === newItem.productId;
      });
      if (existingIndex >= 0) {
        // Update quanitty
        state.cartItems[existingIndex].quantity += newItem.quantity;
      } else {
        // add a new item into array
        state.cartItems.push(newItem);
      }
    },
    setQuantityItemInCart(state, action) {
      // Payload is idProduct and quantity
      const { productId, quantity } = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.product.id === productId
      );
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },
    removeItemFormCart(state, action) {
      // Payload is idProduct in cart page
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== productId
      );
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  showMiniCart,
  hideMiniCart,
  addToCart,
  setQuantityItemInCart,
  removeItemFormCart,
} = actions;
export default reducer;
