import { Page } from "@playwright/test";
import { LoginPage } from "./auth/LoginPage";
import { ForgotPasswordPage } from "./auth/ForgotPassword";
import { HomePage } from "./dashboard/HomePage";

export class PageManager {
  private cache = new Map<new (page: Page) => any, any>();

  constructor(public readonly page: Page) {}

  private resolve<T>(PageClass: new (page: Page) => T): T {
    if (!this.cache.has(PageClass)) {
      this.cache.set(PageClass, new PageClass(this.page));
    }
    return this.cache.get(PageClass)!;
  }

  readonly auth      = new AuthGroup(this.resolve.bind(this));
  readonly dashboard = new DashboardGroup(this.resolve.bind(this));
  readonly user      = new UserGroup(this.resolve.bind(this));
}

type Resolve = <T>(PageClass: new (page: Page) => T) => T;

class AuthGroup {
  constructor(private resolve: Resolve) {}
  get loginPage()    { return this.resolve(LoginPage); }
  get forgotPasswordPage()    { return this.resolve(ForgotPasswordPage); }
  //get register() { return this.resolve(RegisterPage); }
}

class DashboardGroup {
  constructor(private resolve: Resolve) {}
  get homePage() { return this.resolve(HomePage); }
  //get reports()   { return this.resolve(ReportsPage); }
}

class UserGroup {
  constructor(private resolve: Resolve) {}
  //get profile() { return this.resolve(ProfilePage); }
}

// Usage: pm.auth.login   ← clean, no ()