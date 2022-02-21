import { RootState } from '@redux/store'
import { createSlice } from '@reduxjs/toolkit'
interface Items {
  id: string
  name: string
  description: string
  qty: number
}

interface Props {
  items: Items[]
  product_id: string
}
export const initialState: Props = {
  items: [],
  product_id: '',
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      if (state.items.find((item) => item.id === action.payload.id)) {
        state.items[state.items.findIndex((item) => item.id === action.payload.id)].qty++
      } else {
        state.items = [...state.items, { ...action.payload, qty: 1 }]
      }
    },
    removeProducts: (state, action) => {
      state.items[state.items.findIndex((item) => item.id === action.payload.id)].qty--
    },
    deleteProducts: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },
    prodID: (state, action) => {
      state.product_id = action.payload.product_id
    },
  },
})

// Selectors
export const getProducts = (state: RootState) => state.products.items
// Reducers and ActionsRootState
export const { addProducts, removeProducts, deleteProducts, prodID } = productsSlice.actions

export default productsSlice.reducer
