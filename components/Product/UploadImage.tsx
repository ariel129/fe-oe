import { Box, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
interface Props {
  src?: string
}

export const UploadImage: React.FC<Props> = ({ src }) => {
  return (
    <>
      {src ? (
        <Image objectFit="cover" src="/media_placeholder.png" />
      ) : (
        <>
          <Text color="gray.700" lineHeight="24px" fontWeight={500} fontStyle="normal" fontSize={16}>
            Photo
          </Text>
          <VStack
            minW="full"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            border="2px dashed #e5e7eb"
            boxSizing="border-box"
            borderRadius="6px"
            height="260px"
          >
            <Image src="/Path.png" />
            <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems="center">
              <Text color="purple.600" fontStyle="normal" fontWeight={500} lineHeight="20px">
                Upload a file
              </Text>
              <Text color="gray.600" fontStyle="normal" fontWeight={500} lineHeight="20px" ml={1.5}>
                or drag and drop
              </Text>
            </Box>
            <Box mt="4px" w="full">
              <Text
                color="gray.500"
                fontStyle="normal"
                fontWeight="normal"
                fontSize="12px"
                lineHeight="16px"
                textAlign="center"
              >
                PNG, JPG, GIF up to 10MB
              </Text>
            </Box>
          </VStack>
        </>
      )}
    </>
  )
}
