import React from 'react'
import { useRouter } from 'next/router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

interface Props {
  next: string
  link: string
}
export const BreadCrumb: React.FC<Props> = ({ next, link }) => {
  const router = useRouter()

  return (
    <Breadcrumb separator={<ChevronRightIcon color="#6B7280" />}>
      <BreadcrumbItem>
        <BreadcrumbLink onClick={() => router.push(link)} color="gray.400">
          Products
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#" color="gray.400">
          {next}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
