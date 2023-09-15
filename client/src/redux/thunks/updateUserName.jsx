import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:3001/api/v1";

export const updateUserName = createAsyncThunk(
  "auth/updateUserName",
  async (newUserName, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${API_BASE_URL}/user/profile`,
        { userName: newUserName },
        config
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);