import { test as contextTest } from "../fixtures/contextFixture";
import { PageManager } from "../pages/PageManager";

type StorageState = string | { cookies: any[]; origins: any[] };

type pageFixtures = {
    createNALab: (storageState?: StorageState) => Promise<PageManager>
}

export const test = contextTest.extend<pageFixtures>({
    createNALab: async ({ createContext }, use) => {
        const factory = async (storageState?: StorageState) => {
            const { page } = await createContext(storageState);
            return new PageManager(page);
        };
        await use(factory);
    }
})