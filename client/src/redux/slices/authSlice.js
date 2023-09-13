// Redux Toolkit permet d'écrire un code moins "boilerplate" (-répétitif).
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* createAsyncThunk simplifie la gestion des actions et des états pour les opérations asynchrones.
   3 types d'actions pour chaque appel :
    pending : déclenchée avant que la requête asynchrone ne soit lancée.
    fulfilled : déclenchée lorsque la requête asynchrone réussit.
    rejected : déclenchée lorsque la requête asynchrone échoue.
*/
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  //thunkAPI =  ensemble d'outils pour gérer la logique asynchrone du thunk
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
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
      username: null,
    },
    token: null,
    isAuthenticated: false,
    error: null,
  },
  //Actions
  reducers: {
    // reducers = si cette action se produit voici comment je change mon state.
    // Action pour réinitialiser le state lorsque l'user se déconnecte.
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = state.token = state.error = null ;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      // échec
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload; // message d'erreur recu par thunkAPI.rejectWithValue(error.message)
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
