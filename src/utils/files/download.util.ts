import { Page, Locator, Download, test } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export class DownloadUtil {
    constructor(private page: Page) { }

    // =========================================================
    // TRIGGER + CAPTURE DOWNLOAD
    // =========================================================

    /** Step 1: Click a trigger element and capture the resulting download */
    async downloadFile(title: string, triggerLocator: Locator): Promise<Download> {
        return await test.step(title, async () => {
            const [download] = await Promise.all([
                this.page.waitForEvent('download'),
                triggerLocator.click(),
            ]);
            return download;
        });
    }

    /** Step 2: Trigger download via any custom action (not just a click) */
    async downloadViaAction(title: string, triggerAction: () => Promise<void>): Promise<Download> {
        return await test.step(title, async () => {
            const [download] = await Promise.all([
                this.page.waitForEvent('download'),
                triggerAction(),
            ]);
            return download;
        });
    }

    // =========================================================
    // SAVE DOWNLOAD TO DISK
    // =========================================================

    /** Step 3: Save the captured download to a specific path */
    async saveDownload(title: string, download: Download, savePath: string): Promise<string> {
        return await test.step(title, async () => {
            await download.saveAs(savePath);
            return savePath;
        });
    }

    /** Step 4: Click, capture, and save download in one call — returns final saved path */
    async downloadAndSave(title: string, triggerLocator: Locator, saveDir: string): Promise<string> {
        return await test.step(title, async () => {
            const [download] = await Promise.all([
                this.page.waitForEvent('download'),
                triggerLocator.click(),
            ]);
            const savePath = path.join(saveDir, download.suggestedFilename());
            await download.saveAs(savePath);
            return savePath;
        });
    }

    // =========================================================
    // DOWNLOAD METADATA
    // =========================================================

    /** Step 5: Get the suggested filename without saving */
    getSuggestedFileName(download: Download): string {
        return download.suggestedFilename();
    }

    /** Step 6: Get the download URL */
    getDownloadUrl(download: Download): string {
        return download.url();
    }

    /** Step 7: Get any download failure reason (null if successful) */
    async getFailure(download: Download): Promise<string | null> {
        return await download.failure();
    }

    // =========================================================
    // VERIFICATION HELPERS
    // =========================================================

    /** Step 8: Check if downloaded file exists on disk at the given path */
    fileExistsOnDisk(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

    /** Step 9: Get file size in bytes */
    getFileSize(filePath: string): number {
        return fs.statSync(filePath).size;
    }

    /** Step 10: Read downloaded file content as text (for CSV/TXT/JSON verification) */
    readFileAsText(filePath: string): string {
        return fs.readFileSync(filePath, 'utf-8');
    }

    /** Step 11: Delete a downloaded file (cleanup after test) */
    deleteFile(title: string, filePath: string): void {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    /** Step 12: Verify downloaded file extension matches expected */
    hasExpectedExtension(filePath: string, expectedExt: string): boolean {
        return path.extname(filePath).toLowerCase() === expectedExt.toLowerCase();
    }
}