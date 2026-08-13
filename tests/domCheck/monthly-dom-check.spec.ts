import { test, expect } from "../../src/fixtures/baseFixture";
import { verifyPageObject, formatReport, PageVerificationResult } from "../../src/utils/elementVerifier";


test.describe("Monthly UI DOM-Presence Check", () => {

  test("Verify all elements are present across all pages", async ({ NALab, cred }) => {

    const pages = [
      {
        label: "Login Page",
        pageObject: NALab.auth.loginPage,
        goto: async () => {
          await NALab.auth.loginPage.goToLoginPage(cred.baseUrl!);
        },
      },
      {
        label: "Forgot Password Page",
        pageObject: NALab.auth.forgotPasswordPage,
        goto: async () => {
          await NALab.auth.loginPage.goToLoginPage(cred.baseUrl!);
          await NALab.auth.loginPage.navigateToForgotPasswordPage();
          await NALab.auth.forgotPasswordPage.waitForForgotPasswordPage();
        },
      },
      {
        label: "Home Page",
        pageObject: NALab.dashboard.homePage,
        goto: async () => {
          await NALab.auth.loginPage.goToLoginPage(cred.baseUrl!);
          await NALab.auth.loginPage.doLogin(cred.testUserEmail!, cred.testUserPass!);
          await NALab.dashboard.homePage.waitForDashboard();
        },
      },

      // Add more pages here — just add a new entry with label, pageObject, goto
    ];

    // ── Run checks across all pages ───────────────────────────────
    const allReports: PageVerificationResult[] = [];

    for (const entry of pages) {
      try {
        await entry.goto();
        await NALab.page.waitForLoadState("domcontentloaded");
        const report = await verifyPageObject(entry.label, entry.pageObject);
        allReports.push(report);
      } catch (e: any) {
        allReports.push({
          pageName: entry.label,
          passed: 0,
          skipped: 0,
          failed: 1,
          results: [{ name: "Page navigation", locator: "", present: false, skipped: false, error: e.message }],
        });
      }
    }

    // ── Print report ──────────────────────────────────────────────
    const divider = "═".repeat(60);

    // ── Page health overview at the top ───────────────────────
    console.log(`\n${divider}`);
    console.log("  PAGE HEALTH OVERVIEW");
    console.log(divider);
    for (const r of allReports) {
      const status = r.failed === 0 ? "✅" : "❌";
      const pct = Math.round((r.passed / (r.passed + r.failed + r.skipped)) * 100);
      console.log(
        `  ${status}  ${r.pageName.padEnd(30)} ${pct}% healthy  (${r.failed} failed  ${r.skipped} skipped)`
      );
    }

    // ── Detailed report below ─────────────────────────────────
    console.log(`\n${divider}\n  MONTHLY DOM-PRESENCE REPORT\n${divider}`);
    for (const r of allReports) console.log(formatReport(r));

    const totalPassed = allReports.reduce((s, r) => s + r.passed, 0);
    const totalSkipped = allReports.reduce((s, r) => s + r.skipped, 0);
    const totalFailed = allReports.reduce((s, r) => s + r.failed, 0);
    console.log(`\n${divider}`);
    console.log(`  📊  SUMMARY  |  ✅ ${totalPassed} passed  ⏭️ ${totalSkipped} skipped  ❌ ${totalFailed} failed`);
    console.log(divider);

    // ── Single assertion with full failure list ───────────────────
    if (totalFailed > 0) {
      const missingLines: string[] = [];
      for (const r of allReports) {
        const missing = r.results.filter((el) => !el.present);
        if (!missing.length) continue;
        missingLines.push(`\n[${r.pageName}]`);
        for (const el of missing) {
          missingLines.push(`  • ${el.name}`);
          missingLines.push(`    Reason : ${el.error}`);
        }
      }
      expect(
        totalFailed,
        `${totalFailed} element(s) missing from DOM:\n${missingLines.join("\n")}`
      ).toBe(0);
    }
  });
});