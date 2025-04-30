const createClient = {
    createClient: `
mutation CreateClient($input: CreateClientInput!) {
  createClient(input: $input) {
    client {
      ...clientFields
      __typename
    }
    __typename
  }
}

fragment clientFields on Client {
  id
  name
  firstName
  lastName
  mobile
  email
  gender
  isBanned
  landLine
  address {
    streetAddress1
    streetAddress2
    city
    postalCode
    state
    country {
      code
      __typename
    }
    __typename
  }
  dateOfBirth
  notes
  preferredStaff {
    id
    name
    firstName
    lastName
    avatar {
      medium
      __typename
    }
    __typename
  }
  clientSource {
    id
    name
    __typename
  }
  referringClient {
    id
    name
    avatar {
      medium
      __typename
    }
    __typename
  }
  clientCategories {
    id
    name
    description
    __typename
  }
  clientSince
  linkedClient {
    id
    name
    mobile
    __typename
  }
  appointmentReminderSmsOptout
  appointmentReminderEmailOptout
  marketingSmsOptout
  marketingEmailOptout
  shouldPromptClientNotes
  shouldPromptAppointmentNotes
  avatar {
    medium
    __typename
  }
  creditTerms {
    creditLimit
    creditDays
    __typename
  }
  creditAccount {
    id
    outstandingBalance
    __typename
  }
  treatCard {
    serial
    matrixDisabled
    __typename
  }
  treatCardAccount {
    id
    points
    __typename
  }
  isWalkIn
  externalId
  archived
  __typename
}  
    `
}
module.exports = { createClient }
