import { addProduct, Item } from '@redux/reducers/productsReducer'
import { useDispatch } from 'react-redux'

const useProductStore = () => {
  const dispatch = useDispatch()

  const addToCart = (item: Item) => dispatch(addProduct(item))

  return { addToCart }
}

export default useProductStore
