import { createSlice } from "@reduxjs/toolkit";

/* 
  Redux Toolkit permet d'écrire un code moins "boilerplate" (-répétitif).
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
  },

  //Actions
  reducers: {
    // Action pour mettre à jour le state lorsque l'user se connecte (succès).
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; //"payload" pas obligatoire : convention - idem à action.user
      state.token = action.payload.token; // token JWT (JSON Web Tokens)
    },
    // Action pour réinitialiser le state lorsque l'user se déconnecte.
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
