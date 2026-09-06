import type { PageManager } from "../pages/PageManager";
import type { AppEnv } from "../../config/evn.loader";

export type PageEntry = {
    label: string;
    pageObject: object;
    goto: () => Promise<void>;
};

export class PageRegistry {
    constructor(private NALab: PageManager, private cred: AppEnv) { }

    get all(): PageEntry[] {
        return [
            this.loginPage,
            this.homePage,
            this.forgotPasswordPage,
        ];
    }

    get authPages(): PageEntry[] {
        return [
            this.loginPage,
            // add auth-related getters here
        ];
    }

    get dashboardPages(): PageEntry[] {
        return [
            this.homePage,
            // add dashboard-related getters here
        ];
    }

    get loginPage(): PageEntry {
        return {
            label: "Login Page",
            pageObject: this.NALab.auth.loginPage,
            goto: async () => {
                await this.NALab.auth.loginPage.goToLoginPage(this.cred.baseUrl!);
            },
        };
    }

    get forgotPasswordPage(): PageEntry {
        return {
            label: "Forgot Password Page",
            pageObject: this.NALab.auth.forgotPasswordPage,
            goto: async () => {
                await this.NALab.auth.loginPage.goToLoginPage(this.cred.baseUrl!);
                await this.NALab.auth.loginPage.navigateToForgotPasswordPage();
                await this.NALab.auth.forgotPasswordPage.waitForForgotPasswordPage();
            },
        };
    }

    get homePage(): PageEntry {
        return {
            label: "Home Page",
            pageObject: this.NALab.dashboard.homePage,
            goto: async () => {
                await this.NALab.auth.loginPage.goToLoginPage(this.cred.baseUrl);
                await this.NALab.auth.loginPage.doLogin(this.cred.testUserEmail!, this.cred.testUserPass!);
                await this.NALab.dashboard.homePage.waitForDashboard();
            },
        };
    }
}