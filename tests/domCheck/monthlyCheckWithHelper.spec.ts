import { test, expect } from "../../src/fixtures/baseFixture";
import { PageRegistry } from "../../src/helpers/PageRegistry";
import { verifyPageObject, formatReport, PageVerificationResult } from "../../src/utils/elementVerifier";


test.describe("UI Integrity Audit - UI Integrity Audit", () => {

    test("Verify DOM node availability for of all registered UI elements", async ({ NALab, cred }) => {

        const r = new PageRegistry(NALab, cred);

        //const pages = r.all;                                          // all pages
        //const pages = r.authPages;      
        const pages = [r.forgotPasswordPage]

        // ── Run checks across all pages ───────────────────────────────
        const allReports: PageVerificationResult[] = [];

        for (const entry of pages) {
            try {
                await entry.goto();

                // // Debug: see what keys the verifier will scan
                // const allKeys = new Set<string>();
                // Object.getOwnPropertyNames(entry.pageObject).forEach(k => allKeys.add(k));
                // let proto = Object.getPrototypeOf(entry.pageObject);
                // while (proto && proto !== Object.prototype) {
                //     Object.getOwnPropertyNames(proto).forEach(k => allKeys.add(k));
                //     proto = Object.getPrototypeOf(proto);
                // }
                // console.log('Discovered keys:', [...allKeys]);

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