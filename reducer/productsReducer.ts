import { createSlice, current } from '@reduxjs/toolkit'
interface Items {
  id: string
  name: string
  description: string
  qty: number
}

interface Props {
  items: Items[]
}
export const initialState: Props = {
  items: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      if (state.items.find((item) => item.id === action.payload.id)) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        )
      } else {
        state.items = [...state.items, { ...action.payload, qty: 1 }]
      }
    },
    removeProducts: (state, action) => {
      state.items.filter((item: any) => item.id !== action.payload)
    },
  },
})

// Selectors
export const getProducts = (state: any) => state.products
// Reducers and Actions
export const { addProducts } = productsSlice.actions

export default productsSlice.reducer
