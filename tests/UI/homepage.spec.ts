import { expect, test } from "../../src/fixtures/baseFixture";
import { MESSAGES as messages } from "../../src/constants/messages";
import * as CONSTANTS from "../../src/constants/index"
import { SessionProvider } from "../../auth/ui/sessionProvidor";


test('TC 01_UI_AccountPage_TitleVisibility', async ({ createNALab }) => {
    const NALab = await createNALab(SessionProvider.getExistingUserSession())
    await NALab.homePage.navigateToAccount(CONSTANTS.URL.myAccount)
    const allHeaders = await NALab.homePage.getHomePageHeaders();
    console.log(allHeaders);
    console.log(allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toContain("My Account")
    expect.soft(allHeaders).toEqual(messages.homePage.allHeaders)
})