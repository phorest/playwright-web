
import {expect} from "@playwright/test";
import {deleteClientQuery} from "../graphQL/client/deleteClient.query";
import {getClientId} from "../graphQL/client/getClientId";
import {createClient} from "../graphQL/client/createClient.query";
import {testInput} from "../data/testData";
import {createAppointment} from "../graphQL/appointment/createAppointment.query";
import {deleteAppointment} from "../graphQL/appointment/deleteAppointment.query";

const graphQLUrl = 'https://api-gateway-dev.phorest.com/api-facade/graphql';
const testBusinessId = "FSWCMOBUVf5damNYzfGq6g";
const testBranchId = "O1mNsY6iiDDctfaYf1lD-g";
const testUserid = "nqtBpGfocH-K_Fcga6vS8g";

const permanentColourServiceID = "5S5BQj6XcicZD7PJOtRUuvYoUolxXTTr8O-jax5MWPk";

class graphQLCommands{

    async deleteAppointment(page, request){
        const token = await this.getAccessToken(page);
        const deleteClientResponse = await request.post(graphQLUrl,{
            headers: {
                "authorization": `Bearer ${token}`,
                "x-memento-security-context": testBusinessId + "|" + testBranchId + "|" + testUserid
            },
            data: {
                query: deleteAppointment.deleteAppointment,
                variables: {
                    input: testInput
                }
            }
        });
        await expect(deleteClientResponse.ok()).toBeTruthy();
        await expect(deleteClientResponse.status()).toBe(200);
    }
    async createAppointment(page, request, clientID){
        const token = await this.getAccessToken(page);
        const deleteClientResponse = await request.post(graphQLUrl,{
            headers: {
                "authorization": `Bearer ${token}`,
                "x-memento-security-context": testBusinessId + "|" + testBranchId + "|" + testUserid
            },
            data: {
                query: createAppointment.createAppointment,
                variables: {
                    clientId: clientID,
                    date: "2023-12-19",
                    selectedTime: "11:00:00.000",
                    staffMemberId: "cycZX2OEPBc-XWxFKlCxIw", // Joe Hiden
                    serviceId: permanentColourServiceID
                }
            }
        });
        await expect(deleteClientResponse.ok()).toBeTruthy();
        await expect(deleteClientResponse.status()).toBe(200);
    }
    async createClient(page, request){
        const token = await this.getAccessToken(page);
        const deleteClientResponse = await request.post(graphQLUrl,{
            headers: {
                "authorization": `Bearer ${token}`,
                "x-memento-security-context": testBusinessId + "|" + testBranchId + "|" + testUserid
            },
            data: {
                query: createClient.createClient,
                variables: {
                    input: testInput
                }
            }
        });
        await expect(deleteClientResponse.ok()).toBeTruthy();
        await expect(deleteClientResponse.status()).toBe(200);
    }
    async deleteClient(page, request, clientId){
        const deleteClientResponse = await request.post(graphQLUrl,{
            headers: {
                "authorization": `Bearer ${await this.getAccessToken(page)}`,
                "x-memento-security-context": testBusinessId + "|" + testBranchId + "|" + testUserid
            },
            data: {
                query: deleteClientQuery.deleteClient,
                variables: {
                    clientId : clientId
                }
            }
        });
        await expect(deleteClientResponse.ok()).toBeTruthy();
        await expect(deleteClientResponse.status()).toBe(200);
        console.log("Client has removed if existed")
    }

    async getClientId(page, request, criteria){
        // Wait for saving the data in dev
        await new Promise(resolve => setTimeout(resolve, 2000));

        const clientIdResponse = await request.post(graphQLUrl,{
            headers: {
                "authorization": `Bearer ${await this.getAccessToken(page)}`,
                "x-memento-security-context": testBusinessId + "|" + testBranchId + "|" + testUserid
            },
            data: {
                query: getClientId.getClientId,
                variables: {
                    filterBy: {
                        branchId: testBranchId,
                        firstName: criteria
                    }
                }
            }
        });
        await expect(clientIdResponse.ok()).toBeTruthy();
        await expect(clientIdResponse.status()).toBe(200);

        const clientIdResponseJSON = await clientIdResponse.json();
        return clientIdResponseJSON.data.clients.edges[0].node.id;
    }

    async getAccessToken(page){
        return await page.evaluate(() => localStorage.getItem("access-token"));
    }
}

module.exports = new graphQLCommands()
