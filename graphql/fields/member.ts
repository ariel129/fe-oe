export const BASIC_MEMBER_DETAILS = `
  id
  name
  email
  role
  avatar
  type
  followed
  isPrimaryOwner
`

export const BASIC_DETAILS = `
  id
  firstname
  lastname
  emailAddress
  createdAt
`

export default `
  ${BASIC_MEMBER_DETAILS}
  cover
  timezone
  links {
    website
    url
  }
  birthdate
  passwordless
  employmentDate
  about
  location
  phone
  teams {
    id
    name
    color
    members {
      ${BASIC_MEMBER_DETAILS}
    }
  }
  tenancy
  tenurityPercentage
  status
  profileCompletion
  directReports {
    ${BASIC_MEMBER_DETAILS}
  }
  manager {
    ${BASIC_MEMBER_DETAILS}
  }
  lastActive
`
