import { configureStore } from '@reduxjs/toolkit'
import productsReducer from 'redux/reducers/productsReducer'
import counterReducer from 'redux/reducers/counterReducer'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
