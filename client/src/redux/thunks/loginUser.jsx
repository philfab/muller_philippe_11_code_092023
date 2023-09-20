import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL = "http://localhost:3001/api/v1";

/* createAsyncThunk simplifie la gestion des actions et des états pour les opérations asynchrones.
   3 types d'actions pour chaque appel :
    pending : déclenchée avant que la requête asynchrone ne soit lancée.
    fulfilled : déclenchée lorsque la requête asynchrone réussit.
    rejected : déclenchée lorsque la requête asynchrone échoue.
*/

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        email: credentials.username,
        password: credentials.password,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || "Erreur lors de la connexion");
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Erreur lors de la connexion"
      );
    }
  }
);
