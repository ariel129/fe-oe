import { Box, Button, Flex, Text } from '@chakra-ui/react'
import useCounterStore from '@hooks/useCounterStore'
import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'

export default function Counter() {
  const { decrementAction, incrementAction } = useCounterStore()
  const counter = useSelector((state: RootState) => state.counter.value)
  return (
    <Box>
      <Text>{counter}</Text>
      <Flex>
        <Button onClick={incrementAction}>Increment</Button>
        <Button onClick={decrementAction}>Decrement</Button>
      </Flex>
    </Box>
  )
}
