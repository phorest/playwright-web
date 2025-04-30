const createAppointment = {
    createAppointment: `
mutation CreateAppointment($date: LocalDate!, $selectedTime: LocalTime!, $serviceId: ID!, $staffMemberId: ID, $clientId: ID, $issues: [String!]) {
  createAppointment(
    createAppointmentInput: {date: $date, selectedTime: $selectedTime, serviceId: $serviceId, staffId: $staffMemberId, clientId: $clientId}
    acceptedIssues: $issues
  ) {
    appointment {
      ...appointmentFields
      staffMember: staff {
        ...staffMemberFields
        __typename
      }
      customPrompts {
        id
        type
        text
        __typename
      }
      __typename
    }
    issues {
      issueType
      date
      __typename
    }
    __typename
  }
}

fragment appointmentFields on Appointment {
  id
  date
  startTime
  endTime
  durationMins
  price {
    amount
    currency
    __typename
  }
  depositPaid {
    amount
    currency
    __typename
  }
  depositAmount {
    amount
    currency
    __typename
  }
  min24HourDepositPaid {
    amount
    currency
    __typename
  }
  machineId
  machine {
    id
    name
    __typename
  }
  roomId
  room {
    id
    name
    __typename
  }
  staffMemberId
  flags
  staffRequested
  confirmed
  state
  service {
    id
    name
    color {
      hex
      __typename
    }
    durationMins
    gapTimeMins
    patchTestRequired
    price {
      amount
      currency
      __typename
    }
    __typename
  }
  client {
    id
    name
    firstName
    mobile
    email
    isBanned
    shouldPromptClientNotes
    shouldPromptAppointmentNotes
    __typename
  }
  clientCourse {
    id
    name
    expirationDate
    expired
    __typename
  }
  clientCourseItem {
    id
    unitType
    initialUnits
    unitsRemaining
    __typename
  }
  recurrenceId
  lastReminderSentTime
  groupBookingId
  groupBookingPrimaryClientId
  serviceGroupId
  serviceGroupItemOptionId
  hasMicroDeposit
  __typename
}

fragment staffMemberFields on Staff {
  id
  name
  firstName
  lastName
  categoryId
  color {
    hex
    __typename
  }
  avatar {
    medium
    __typename
  }
  userId
  __typename
}    
`
}
module.exports = { createAppointment }
