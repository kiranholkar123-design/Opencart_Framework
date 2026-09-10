import { Page, Request, Response, test } from '@playwright/test';

export class NetworkUtil {
  constructor(private page: Page) {}

  // =========================================================
  // CAPTURE RESPONSE (triggered by a UI action)
  // =========================================================

  /** Step 1: Wait for and capture a specific response, triggered by a UI action */
  async captureResponse(
    title: string,
    urlPattern: string | RegExp,
    triggerAction: () => Promise<void>
  ): Promise<Response> {
    return await test.step(title, async () => {
      const [response] = await Promise.all([
        this.page.waitForResponse(urlPattern),
        triggerAction(),
      ]);
      return response;
    });
  }

  /** Step 2: Capture response and parse JSON body directly */
  async captureResponseJSON(
    title: string,
    urlPattern: string | RegExp,
    triggerAction: () => Promise<void>
  ): Promise<any> {
    return await test.step(title, async () => {
      const [response] = await Promise.all([
        this.page.waitForResponse(urlPattern),
        triggerAction(),
      ]);
      return await response.json();
    });
  }

  /** Step 3: Capture response status code only */
  async captureResponseStatus(
    title: string,
    urlPattern: string | RegExp,
    triggerAction: () => Promise<void>
  ): Promise<number> {
    return await test.step(title, async () => {
      const [response] = await Promise.all([
        this.page.waitForResponse(urlPattern),
        triggerAction(),
      ]);
      return response.status();
    });
  }

  // =========================================================
  // CAPTURE REQUEST (triggered by a UI action)
  // =========================================================

  /** Step 4: Wait for and capture a specific request, triggered by a UI action */
  async captureRequest(
    title: string,
    urlPattern: string | RegExp,
    triggerAction: () => Promise<void>
  ): Promise<Request> {
    return await test.step(title, async () => {
      const [request] = await Promise.all([
        this.page.waitForRequest(urlPattern),
        triggerAction(),
      ]);
      return request;
    });
  }

  /** Step 5: Capture request payload (POST body) */
  async captureRequestPayload(
    title: string,
    urlPattern: string | RegExp,
    triggerAction: () => Promise<void>
  ): Promise<string | null> {
    return await test.step(title, async () => {
      const [request] = await Promise.all([
        this.page.waitForRequest(urlPattern),
        triggerAction(),
      ]);
      return request.postData();
    });
  }

  // =========================================================
  // LISTEN TO ALL NETWORK ACTIVITY (passive collection)
  // =========================================================

  /** Step 6: Start collecting ALL responses matching a pattern during a block of actions */
  async collectAllResponses(
    title: string,
    urlPattern: string | RegExp,
    actions: () => Promise<void>
  ): Promise<Response[]> {
    return await test.step(title, async () => {
      const responses: Response[] = [];
      const listener = (response: Response) => {
        if (typeof urlPattern === 'string' ? response.url().includes(urlPattern) : urlPattern.test(response.url())) {
          responses.push(response);
        }
      };
      this.page.on('response', listener);
      await actions();
      this.page.off('response', listener);
      return responses;
    });
  }

  /** Step 7: Collect ALL failed requests during a block of actions (for debugging) */
  async collectFailedRequests(
    title: string,
    actions: () => Promise<void>
  ): Promise<Request[]> {
    return await test.step(title, async () => {
      const failed: Request[] = [];
      const listener = (request: Request) => failed.push(request);
      this.page.on('requestfailed', listener);
      await actions();
      this.page.off('requestfailed', listener);
      return failed;
    });
  }

  // =========================================================
  // NETWORK MOCKING / INTERCEPTION (optional, common pairing)
  // =========================================================

  /** Step 8: Mock a response for a given URL pattern */
  async mockResponse(
    title: string,
    urlPattern: string | RegExp,
    mockData: object,
    status: number = 200
  ): Promise<void> {
    await test.step(title, async () => {
      await this.page.route(urlPattern, (route) => {
        route.fulfill({
          status,
          contentType: 'application/json',
          body: JSON.stringify(mockData),
        });
      });
    });
  }

  /** Step 9: Remove a previously set mock/route */
  async clearMock(title: string, urlPattern: string | RegExp): Promise<void> {
    await test.step(title, async () => {
      await this.page.unroute(urlPattern);
    });
  }
}