// Redux Toolkit permet d'écrire un code moins "boilerplate" (-répétitif).
import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../redux/thunks/loginUser";
import { getUserProfile } from "../../redux/thunks/getUserProfile";
import { updateUserName } from "../../redux/thunks/updateUserName";
/*
  createSlice (redux toolkit) permet de définir plus simplement(+concis,-verbeux) les reducers et les actions correspondantes.
  immer (redux toolkit) sous le capot permet de traiter les mises à jour du state de manière immuable (code +lisible +sûr) et
  évite aussi les destructurations en profondeur (plusieurs niveaux de déstructuration).
  immuable = une fois un objet créé il ne peut être modifié.Pour le modifier il faut créer une copie et faire les modifs.
*/
const authSlice = createSlice({
  name: "auth",
  // définit l'état avant toute action. Si l'état est undefined alors l'état initial sera renvoyé(-erreurs).
  initialState: {
    user: {
      firstName: null,
      lastName: null,
      userName: null,
    },

    token: null,
    isAuthenticated: false,
    error: null,
  },
  //Actions
  reducers: {
    // reducers = si cette action se produit voici comment je change mon state.
    // action pour réinitialiser le state lorsque l'user se déconnecte.
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = state.token = state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  // Action pour mettre à jour le state lorsque l'user se connecte.
  // 'pending' pas implémenté car utilisé pour indiquer une attente (isLoading)comme un spinner.
  extraReducers: (builder) => {
    // extraReducers = propriété qui écoute les actions en dehors du slice (asynchrones ou autres externes )
    // modifie le state en fonction de la réponse de la requête (attente, réussite, échec).
    builder // builder = outil pour chaîner plusieurs actions et définir les réponses
      // réussite
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.body.token;
        state.error = null;
      })
      // échec
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload; // message d'erreur recu par thunkAPI.rejectWithValue(error.message)
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.user.userName = action.payload.body.userName; 
        state.error = null;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.error = action.payload; 
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
