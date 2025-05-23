import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
 name: "auth",
 initialState,
 reducers:{
    loginOne:(state, action) => {
         state.status = true
         state.userData = action.payload.userData
    },
    logoutOne:(state) => {
        state.status = false;
        state.userData = null
    }
 }
})
 export const {loginOne, logoutOne} = authSlice.actions
export default authSlice.reducer
