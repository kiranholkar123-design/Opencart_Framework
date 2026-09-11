import { Page, Locator, test } from '@playwright/test';
import path from 'path';

export class UploadUtil {
  constructor(private page: Page) {}

  // =========================================================
  // SINGLE FILE UPLOAD
  // =========================================================

  /** Step 1: Upload a single file via a file input locator */
  async uploadFile(title: string, locator: Locator, filePath: string): Promise<void> {
    await test.step(title, async () => {
      await locator.setInputFiles(filePath);
    });
  }

  /** Step 2: Upload a file using a relative path (resolved against a base folder) */
  async uploadFileFromFolder(title: string, locator: Locator, folder: string, fileName: string): Promise<void> {
    await test.step(title, async () => {
      const filePath = path.join(folder, fileName);
      await locator.setInputFiles(filePath);
    });
  }

  // =========================================================
  // MULTIPLE FILE UPLOAD
  // =========================================================

  /** Step 3: Upload multiple files at once via a single file input */
  async uploadMultipleFiles(title: string, locator: Locator, filePaths: string[]): Promise<void> {
    await test.step(title, async () => {
      await locator.setInputFiles(filePaths);
    });
  }

  // =========================================================
  // IN-MEMORY / BUFFER UPLOAD (no real file needed on disk)
  // =========================================================

  /** Step 4: Upload a file generated in-memory (no file needs to exist on disk) */
  async uploadFromBuffer(
    title: string,
    locator: Locator,
    fileName: string,
    mimeType: string,
    content: string | Buffer
  ): Promise<void> {
    await test.step(title, async () => {
      await locator.setInputFiles({
        name: fileName,
        mimeType,
        buffer: typeof content === 'string' ? Buffer.from(content) : content,
      });
    });
  }

  // =========================================================
  // DRAG-AND-DROP UPLOAD (for non-standard file inputs)
  // =========================================================

  /** Step 5: Upload via native file chooser triggered by a click (e.g. custom upload buttons) */
  async uploadViaFileChooser(title: string, triggerLocator: Locator, filePath: string): Promise<void> {
    await test.step(title, async () => {
      const [fileChooser] = await Promise.all([
        this.page.waitForEvent('filechooser'),
        triggerLocator.click(),
      ]);
      await fileChooser.setFiles(filePath);
    });
  }

  /** Step 6: Upload multiple files via native file chooser */
  async uploadMultipleViaFileChooser(title: string, triggerLocator: Locator, filePaths: string[]): Promise<void> {
    await test.step(title, async () => {
      const [fileChooser] = await Promise.all([
        this.page.waitForEvent('filechooser'),
        triggerLocator.click(),
      ]);
      await fileChooser.setFiles(filePaths);
    });
  }

  // =========================================================
  // REMOVE / CLEAR UPLOAD
  // =========================================================

  /** Step 7: Clear selected files from an input */
  async clearUploadedFiles(title: string, locator: Locator): Promise<void> {
    await test.step(title, async () => {
      await locator.setInputFiles([]);
    });
  }
}   