// Importer la fonction createSlice
import { createSlice } from "@reduxjs/toolkit";

// Définir l'état initial
const initialState = {
    value: { token: null, email: null },
};

// Créer une tranche d'un état (stockée dans une variable qui contient:
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // fonction qui a pour paramètre l'état initiale et l'action à exécuter
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.email = action.payload.email;
          },
          logout: (state) => {
            state.value.token = null;
            state.value.email = null;
          },
    },
});

// Export
export const { login, logout} = usersSlice.actions;
export default usersSlice.reducer;
