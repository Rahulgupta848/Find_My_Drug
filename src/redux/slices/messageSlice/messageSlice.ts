import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface messageState {
     error: boolean;
     msg: string;
     show:boolean;
}

const initialState: messageState = {
     show:false,
     error: false,
     msg: ''
}
export const slice = createSlice({
     name: "message",
     initialState,
     reducers:{
          showMessage:(state,action:PayloadAction<messageState>)=>{
               state.error = action.payload.error;
               state.msg = action.payload.msg;
               state.show = action.payload.show;
          },
          hideMessage:(state)=>{
               state.error = false;
               state.msg = "";
               state.show = false;
          }

     }
})

export default  slice.reducer;
export const {showMessage,hideMessage} = slice.actions;