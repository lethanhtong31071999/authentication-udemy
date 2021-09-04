import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/userSlice";
import categoryReducer from "../features/Product/categorySlice";
import cartReducer from "../features/Cart/cartSlice";

const rootReducer = {
  user: userReducer,
  category: categoryReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
