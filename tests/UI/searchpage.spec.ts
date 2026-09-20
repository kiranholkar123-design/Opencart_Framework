import { SessionProvider } from "../../auth/ui/sessionProvidor";
import { test } from "../../src/fixtures/baseFixture";
import * as CONSTANTS from "../../src/constants/index"


test('Search valid expected product',
    {
        tag: ['@sanity', '@regression'],
        annotation: [
            { type: "Title", description: "Verify that user is able to search for a product and see relevant results" }
        ]
    },
    async ({ createNALabSession, assert }) => {

        const { nALab, productName } = await test.step('Prepare test data',
            async () => {
                const nALab = await createNALabSession(
                    SessionProvider.getExistingUserSession());
                const productName = 'MacBook Pro';

                return {
                    nALab,
                    productName
                }
            }
        )



        await test.step('Launch the NALab My Account Page',
            async () => {
                await nALab.homePage.navigateToAccount(CONSTANTS.URL.myAccount);
                await nALab.homePage.waitForHomePageToLoad();
                await nALab.homePage.assertPageURL(
                    `Assert User land on account page`,
                    CONSTANTS.URL.myAccount)
            }
        )

        await test.step('Search For Product',
            async () => {
                await nALab.homePage.searchForProduct(productName);
            }
        )

        await test.step('Verify search results',
            async () => {
                await assert.isTruthy('Assert expected product is Present',
                    await nALab.searchPage.isExpectedProductPresent(productName),
                    productName)
            }
        )

    }
)