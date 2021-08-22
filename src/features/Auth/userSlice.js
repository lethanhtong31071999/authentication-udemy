import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";

// Define action async
const register = createAsyncThunk(
  "user/register",
  // payload la data khi goi ham register truyen vao
  async (payload) => {
    // Call API
    const res = await userApi.register(payload);
    const data = res.data;
    console.log("data get API", data);

    // Save data to localstorage
    localStorage.setItem("ACESS_TOKEN", data.jwt);
    localStorage.setItem("USER", JSON.stringify(data.user));

    // Tuong duong payload o action trong extraReducer
    // return user data
    return data.user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    // current mean current user
    current: {},
    setting: {},
    loading: false,
  },
  reducer: {},
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true;
    },

    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
      state.loading = false;
    },

    [register.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer, actions } = userSlice;
export const {} = actions;
export { register };
export default reducer;
