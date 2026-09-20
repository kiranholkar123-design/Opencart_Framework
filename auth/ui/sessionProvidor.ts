import * as fs from 'fs';

export class SessionProvider {

    static getExistingUserSession() {
        const path = 'auth/ui/storageState/existingUserSession.json';
        if (!fs.existsSync(path)) {
            throw new Error(`Storage state file not found: ${path}. Did globalSetup run?`);
        }
        return path;
    }

    static getAdminSession() {
        const path = 'auth/ui/storageState/adminSession.json';
        if (!fs.existsSync(path)) {
            throw new Error(`Storage state file not found: ${path}. Did globalSetup run?`);
        }
        return path;
    }

    static getNewUserSession() {
        return undefined;
    }
}