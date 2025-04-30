const deleteAppointment = {
    deleteAppointment:
`
mutation DeleteAppointments(
  $ids: [ID!]!
  $deleteAllRecurringAppointments: Boolean
) {
  deleteAppointments(
    input: {
      appointmentIds: $ids
      deleteAllRecurringAppointments: $deleteAllRecurringAppointments
    }
  ) {
    appointments {
      id
      __typename
    }
    __typename
  }
}
`
}
module.exports = { deleteAppointment }
