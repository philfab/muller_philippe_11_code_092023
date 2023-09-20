import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "./apiConfig";

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${API_BASE_URL}/user/profile`,
        {},
        config
      );
      return response.data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
