
import {expect} from "@playwright/test";
import {deleteClientQuery} from "../graphQL/deleteClient.query";
import {getClientId} from "../graphQL/getClientId";

class graphQLCommands{
    async deleteClient(page, request, clientId){
        const accessToken = await page.evaluate(() => localStorage.getItem("access-token"));
        const graphQLUrl = 'https://api-gateway-dev.phorest.com/api-facade/graphql';

        const testBusinessId = "FSWCMOBUVf5damNYzfGq6g";
        const testBranchId = "O1mNsY6iiDDctfaYf1lD-g";
        const testUserid = "nqtBpGfocH-K_Fcga6vS8g";

        const deleteClientResponse = await request.post(graphQLUrl,{
            headers: {
                "authorization": `Bearer ${accessToken}`,
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
    }

    async getClientId(page, request, criteria){
        // Wait for saving the data in dev
        await new Promise(resolve => setTimeout(resolve, 3000));

        const accessToken = await page.evaluate(() => localStorage.getItem("access-token"));
        const graphQLUrl = 'https://api-gateway-dev.phorest.com/api-facade/graphql';

        const testBusinessId = "FSWCMOBUVf5damNYzfGq6g";
        const testBranchId = "O1mNsY6iiDDctfaYf1lD-g";
        const testUserid = "nqtBpGfocH-K_Fcga6vS8g";

        const clientIdResponse = await request.post(graphQLUrl,{
            headers: {
                "authorization": `Bearer ${accessToken}`,
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

        let clientIdResponseJSON = await clientIdResponse.json();
        return clientIdResponseJSON.data.clients.edges[0].node.id;
    }
}

module.exports = new graphQLCommands()
