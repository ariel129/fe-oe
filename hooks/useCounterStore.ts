import { increment, decrement } from '@redux/reducers/counterReducer'
import { useDispatch } from 'react-redux'

const useCounterStore = () => {
  const dispatch = useDispatch()

  const incrementAction = () => dispatch(increment())
  const decrementAction = () => dispatch(decrement())

  return { incrementAction, decrementAction }
}

export default useCounterStore
