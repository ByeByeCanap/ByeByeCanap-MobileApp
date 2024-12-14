import { createSlice } from "@reduxjs/toolkit";

// Defined the initial state of the store
const initialState = {
  value: {
    // CredentialInfos
    email: null,
    password: null,
    token: null,

    // PersonnalInfos
    lastName: null,
    firstName: null,
    nickName: null,
    birthDate: null,
    gender: null,
    userType : null,
  },
};

// Créer une tranche d'un état (stockée dans une variable qui contient:
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // fonction qui a pour paramètre l'état initiale et l'action à exécuter
    userType: (state, action) => {
      state.value.userType = action.payload
    },
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.nickName = action.payload.nickName;
    },
    CreateAccount: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
      state.value.lastName = action.payload.lastName;
      state.value.firstName = action.payload.firstName;
      state.value.nickName = action.payload.nickName;
      state.value.birthDate = action.payload.birthDate;
      state.value.gender = action.payload.gender;
    },
    logout: (state) => {
      state.value = initialState.value;
    },
    resetStore: (state) => {
      state.value = null;
    },
    reintializationStore: (state) => {
      state.value = {};
    }
  },
});

// Export
export const { login, CreateAccount, logout, userType, resetStore, reintializationStore } = usersSlice.actions;
export default usersSlice.reducer;
