import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import STORAGE_KEY from "constanst/storage_key";

// Define action async
const registerAction = createAsyncThunk(
  "user/register",
  // payload la data khi goi ham register truyen vao
  async (payload) => {
    // Call API
    const data = await userApi.register(payload);
    console.log("data get API", data);

    // Save data to localstorage
    localStorage.setItem(STORAGE_KEY.TOKEN, data.jwt);
    localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(data.user));

    // Tuong duong payload o action trong extraReducer
    // return user data
    return data.user;
  }
);

const loginAction = createAsyncThunk("user/login", async (payload) => {
  const data = await userApi.login(payload);
  localStorage.setItem(STORAGE_KEY.TOKEN, data.jwt);
  localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(data.user));
  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    // current mean current user
    current: JSON.parse(localStorage.getItem(STORAGE_KEY.USER)) || {},
    setting: {},
    loading: false,
  },
  reducers: {
    logoutAction: (state, action) => {
      localStorage.removeItem(STORAGE_KEY.TOKEN);
      localStorage.removeItem(STORAGE_KEY.USER);
      state.current = {};
    },
  },
  extraReducers: {
    // Handle register action
    [registerAction.pending]: (state, action) => {
      state.loading = true;
    },

    [registerAction.fulfilled]: (state, action) => {
      state.current = action.payload;
      state.loading = false;
    },

    [registerAction.rejected]: (state, action) => {
      state.loading = false;
    },

    // Handle login action
    [loginAction.pending]: (state) => {
      state.loading = true;
    },

    [loginAction.fulfilled]: (state, action) => {
      state.current = action.payload;
      state.loading = false;
    },

    [loginAction.rejected]: (state) => {
      state.loading = false;
    },
  },
});

const { reducer, actions } = userSlice;
console.log("action: ", userSlice);
export const { logoutAction } = actions;
export { registerAction, loginAction };
export default reducer;
