const deleteClientQuery = {
    deleteClient: `mutation ForgetClient($clientId: ID!) {forgetClient(clientId: $clientId)}`
}
module.exports = { deleteClientQuery }
