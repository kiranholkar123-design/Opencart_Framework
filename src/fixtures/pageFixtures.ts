import { test as contextTest } from "../fixtures/contextFixture";
import { PageManager } from "../pages/PageManager";


type pageFixtures = {
    NALab: PageManager
}

export const test = contextTest.extend<pageFixtures>({
    NALab: async ({ createContext }, use) => {
        const { page } = await createContext();
        const NALab = new PageManager(page);
        await use(NALab);
    }
})


