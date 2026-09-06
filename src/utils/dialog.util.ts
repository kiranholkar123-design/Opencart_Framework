import { Page, Dialog, test } from '@playwright/test';

export class DialogUtil {
  constructor(private page: Page) {}

  // =========================================================
  // DIALOG HANDLING
  // =========================================================

  /** Accept the next alert/confirm/prompt dialog triggered by an action */
  async acceptDialog(title: string, triggerAction: () => Promise<void>, promptText?: string): Promise<string> {
    return await test.step(title, async () => {
      let dialogMessage = '';
      this.page.once('dialog', async (dialog: Dialog) => {
        dialogMessage = dialog.message();
        await dialog.accept(promptText);
      });
      await triggerAction();
      return dialogMessage;
    });
  }

  /** Dismiss the next dialog triggered by an action */
  async dismissDialog(title: string, triggerAction: () => Promise<void>): Promise<string> {
    return await test.step(title, async () => {
      let dialogMessage = '';
      this.page.once('dialog', async (dialog: Dialog) => {
        dialogMessage = dialog.message();
        await dialog.dismiss();
      });
      await triggerAction();
      return dialogMessage;
    });
  }
}