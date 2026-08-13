import { Locator } from "@playwright/test";

export interface ElementCheckResult {
  name: string;
  locator: string;
  present: boolean;
  skipped?: boolean;
  error?: string | undefined;
}

export interface PageVerificationResult {
  pageName: string;
  passed: number;
  skipped: number;
  failed: number;
  results: ElementCheckResult[];
}

export async function verifyPageObject(
  pageName: string,
  pageObject: object
): Promise<PageVerificationResult> {
  const results: ElementCheckResult[] = [];

  // ── read skip list from page object if it exists ──────────
  const skipList: string[] = (pageObject as any).skipVerification ?? [];

  for (const key of Object.getOwnPropertyNames(pageObject)) {
    const value = (pageObject as any)[key];

    // ── skip the skipVerification array itself ─────────────
    if (key === "skipVerification") continue;

    // ── skip flagged locators ──────────────────────────────
    if (skipList.includes(key)) {
      results.push({
        name: key,
        locator: value?.toString?.() ?? "",
        present: true,
        skipped: true,
        error: "Skipped — requires user action to appear",
      });
      continue;
    }

    if (!value || typeof value.count !== "function") continue;

    let present = false;
    let locator = "";
    let error: string | undefined;

    try {
      locator = value.toString();
      present = (await value.count()) > 0;
      if (!present) error = "Element not found in DOM (count = 0)";
    } catch (e: any) {
      error = e?.message ?? String(e);
    }

    results.push({ name: key, locator, present, skipped: false, error });
  }

  const passed = results.filter((r) => r.present && !r.skipped).length;
  const skipped = results.filter((r) => r.skipped).length;
  const failed = results.filter((r) => !r.present).length;

  return { pageName, passed, skipped, failed, results };
}

export function formatReport(report: PageVerificationResult): string {
  const lines = [
    `\n📄 ${report.pageName} — ✅ ${report.passed} passed  ⏭️ ${report.skipped} skipped  ❌ ${report.failed} failed`,
    "─".repeat(60),
  ];

  const failures = report.results.filter((r) => !r.present && !r.skipped);

  if (failures.length === 0) {
    lines.push("  ✅  All elements present");
  } else {
    for (const r of failures) {
      lines.push(`  ❌  ${r.name}`);
      lines.push(`      Locator : ${r.locator}`);
      lines.push(`      Reason  : ${r.error}`);
    }
  }

  return lines.join("\n");
}