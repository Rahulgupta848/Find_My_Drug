import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pharmacyState } from "../../types";
import Apis from "../../../api";
import { handleError } from "../../../utils";


const initialState: pharmacyState = {
     items: [],
     itemCount: 0,
     loading: false
}

export const fetchPharmacyItems = createAsyncThunk("pharmacy/items", async (_, { dispatch }) => {
     try {
          const response = await Apis.fetchItems();
          console.log(response);
          return {data:response.data.data,count:response.data.count};
     } catch (error: any) {
          handleError(error?.response?.status, error?.response?.data?.message, dispatch);
          return {data:[],count:0};
     }
})

const slice = createSlice({
     name: "pharmacy",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(fetchPharmacyItems.pending, (state) => {
                    state.loading = true;
               })
               .addCase(fetchPharmacyItems.fulfilled, (state, action) => {
                    state.loading = false;
                    state.items = action.payload.data;
                    state.itemCount = action.payload.count;
               })
               .addCase(fetchPharmacyItems.rejected, (state) => {
                    state.loading = false,
                    state.items = []
               })
     }

})

export default slice.reducer;


