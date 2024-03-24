import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import messageReducer from "./slices/messageSlice/messageSlice";
import userReducer from "./slices/authSlice/authSlice";
import pharmacyReducer from "./slices/pharmacySlice/pharmacySlice";

export const store = configureStore({
     reducer: {
          message:messageReducer,
          user:userReducer,
          pharmacy:pharmacyReducer
     }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;