import { RootState } from '@redux/store'
import { createSlice } from '@reduxjs/toolkit'

interface Props {
  user_id: string
}
export const initialState: Props = {
  user_id: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.user_id = action.payload.user_id
    },
  },
})

// Selectors
export const getUserID = (state: RootState) => state.users.user_id
// Reducers and ActionsRootState
export const { setUserID } = usersSlice.actions

export default usersSlice.reducer
