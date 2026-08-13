import { test, expect } from "../../src/fixtures/baseFixture";
import {
    verifyPageObject,
    formatReport,
    PageVerificationResult,
} from "../../src/utils/elementVerifier";

test.describe.configure({ mode: "serial" });

test.describe("[Health Check] DOM Structure Integrity Check — All Pages", () => {
    const divider = "═".repeat(65);
    const allReports: PageVerificationResult[] = [];

    // ── LOGIN PAGE ───────────────────────────────────────────────
    test("Login Page | Verify all UI elements are present in DOM", async ({ NALab, cred }) => {
        try {
            await NALab.auth.loginPage.goToLoginPage(cred.baseUrl!);
            await NALab.page.waitForLoadState("domcontentloaded");
            const report = await verifyPageObject("Login Page", NALab.auth.loginPage);
            allReports.push(report);
        } catch (e: any) {
            allReports.push({
                pageName: "Login Page",
                passed: 0,
                skipped: 0,
                failed: 1,
                results: [{ name: "Page navigation", locator: "", present: false, skipped: false, error: e.message }],
            });
        }

        const report = allReports.find((r) => r.pageName === "Login Page")!;
        const missing = report.results.filter((el) => !el.present);
        if (missing.length) {
            expect(
                report.failed,
                missing.flatMap((el) => [`  • ${el.name}`, `    Reason : ${el.error}`]).join("\n")
            ).toBe(0);
        }
    });

    // ── HOME PAGE ────────────────────────────────────────────────
    test("Home Page | Verify all UI elements are present in DOM", async ({ NALab, cred }) => {
        try {
            await NALab.auth.loginPage.goToLoginPage(cred.baseUrl);
            await NALab.auth.loginPage.doLogin(cred.testUserEmail!, cred.testUserPass!);
            await NALab.dashboard.homePage.waitForDashboard();
            await NALab.page.waitForLoadState("domcontentloaded");
            const report = await verifyPageObject("Home Page", NALab.dashboard.homePage);
            allReports.push(report);
            await NALab.dashboard.homePage.doLogOut();
        } catch (e: any) {
            allReports.push({
                pageName: "Home Page",
                passed: 0,
                skipped: 0,
                failed: 1,
                results: [{ name: "Page navigation", locator: "", present: false, skipped: false, error: e.message }],
            });
        }

        const report = allReports.find((r) => r.pageName === "Home Page")!;
        const missing = report.results.filter((el) => !el.present);
        if (missing.length) {
            expect(
                report.failed,
                missing.flatMap((el) => [`  • ${el.name}`, `    Reason : ${el.error}`]).join("\n")
            ).toBe(0);
        }
    });

    // ── Forgot Password PAGE ────────────────────────────────────────────────
    test("Forgot Password PAGE | Verify all UI elements are present in DOM", async ({ NALab, cred }) => {
        try {
            await NALab.auth.loginPage.goToLoginPage(cred.baseUrl);
            await NALab.auth.loginPage.navigateToForgotPasswordPage();
            await NALab.auth.forgotPasswordPage.waitForForgotPasswordPage();
            await NALab.page.waitForLoadState("domcontentloaded");
            const report = await verifyPageObject("Forgot Password PAGE", NALab.auth.forgotPasswordPage);
            allReports.push(report);
        } catch (e: any) {
            allReports.push({
                pageName: "Forgot Password PAGE",
                passed: 0,
                skipped: 0,
                failed: 1,
                results: [{ name: "Page navigation", locator: "", present: false, skipped: false, error: e.message }],
            });
        }

        const report = allReports.find((r) => r.pageName === "Forgot Password PAGE")!;
        const missing = report.results.filter((el) => !el.present);
        if (missing.length) {
            expect(
                report.failed,
                missing.flatMap((el) => [`  • ${el.name}`, `    Reason : ${el.error}`]).join("\n")
            ).toBe(0);
        }
    });

    // ── AFTER ALL: combined summary ──────────────────────────────
    test.afterAll(() => {

        // ── Page health overview at the top ───────────────────────
        console.log(`\n${divider}`);
        console.log("🔬 DOM AUDIT HEALTH MATRIX");
        console.log(divider);
        for (const r of allReports) {
            const status = r.failed === 0 ? "✅" : "❌";
            const pct = Math.round((r.passed / (r.passed + r.failed + r.skipped)) * 100);
            console.log(
                `  ${status}  ${r.pageName.padEnd(30)} ${pct}% healthy  (${r.failed} failed  ${r.skipped} skipped)`
            );
        }

        // ── Detailed report below ─────────────────────────────────
        console.log(`\n${divider}\n📝 DOM ELEMENT PRESENCE AUDIT — DETAILED AUDIT LOG\n${divider}`);
        for (const r of allReports) console.log(formatReport(r));

        const totalPassed = allReports.reduce((s, r) => s + r.passed, 0);
        const totalSkipped = allReports.reduce((s, r) => s + r.skipped, 0);
        const totalFailed = allReports.reduce((s, r) => s + r.failed, 0);
        console.log(`\n${divider}`);
        console.log(`  📊  SUMMARY  |  ✅ ${totalPassed} passed  ⏭️ ${totalSkipped} skipped  ❌ ${totalFailed} failed`);
        console.log(divider);
    });
});