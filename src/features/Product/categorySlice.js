import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
  },
  reducers: {
    addCategory: (state, action) => {
      state.categoryList = state.categoryList.concat(action.payload);
    },
  },
});

const { reducer, actions } = categorySlice;

export const { addCategory } = actions;
export default reducer;
