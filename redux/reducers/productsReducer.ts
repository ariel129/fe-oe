import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from 'types'
export interface Item extends Pick<Product, 'id' | 'name' | 'description'> {
  qty?: number
}

export interface Products {
  items: Item[]
}

const initialState: Products = {
  items: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, { payload }: PayloadAction<Item>) => {
      const existingItem = state.items.find((item) => item.id === payload.id)
      if (existingItem?.qty) {
        existingItem.qty += 1
      } else {
        state.items.push({ ...payload, qty: 1 })
      }
    },
    removeProducts: (state, action) => {
      state.items = state.items.filter((item: Item) => item.id !== action.payload)
    },
  },
})

export const { addProduct } = productsSlice.actions
export default productsSlice.reducer
