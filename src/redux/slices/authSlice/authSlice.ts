import { createSlice } from "@reduxjs/toolkit";
import { authState } from "../../types";


let initialState: authState = {
     name: '',
     pharmacyName: '',
     email: '',
     mobileNo: '',
     role: '',
     country: '',
     state: '',
     city: '',
     pincode: '',
     addressLine1: '',
     loading: false,
     id: '',
     token: ''
};

const slice = createSlice({
     name: 'auth',
     initialState,
     reducers: {
          userDetails: (state, action) => {
               state.name = action.payload.name;
               state.pharmacyName = action.payload.pharmacyName;
               state.email = action.payload.email;
               state.mobileNo = action.payload.mobileNo;
               state.role = action.payload.role;
               state.country = action.payload.country;
               state.state = action.payload.state;
               state.city = action.payload.city;
               state.pincode = action.payload.pincode;
               state.addressLine1 = action.payload.addressLine1;
               state.id = action.payload.id;
               state.token = action.payload.token;
          },

          removeUserDetails: (state) => {
               state.name = '';
               state.pharmacyName = '';
               state.email = '';
               state.mobileNo = '';
               state.role = '';
               state.country = '';
               state.state = '';
               state.city = '';
               state.pincode = '';
               state.addressLine1 = '';
               state.id = '';
               state.token = '';
          }
     }
})

export default slice.reducer;
export const { userDetails, removeUserDetails } = slice.actions;