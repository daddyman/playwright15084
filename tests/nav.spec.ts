import { test, expect, type Page, Locator } from '@playwright/test';

test.describe.serial('tests', () => {

    let page: Page;
    const baseUrl = 'http://localhost:3000';
    const homeUrl = baseUrl + '/';
    const test1Url = baseUrl + '/test1';
    const count = 10;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('initial', async () => {
        await page.goto(baseUrl);

        const title = page.locator('h2#title');
        expect(await title.textContent()).toEqual('Home');
    });

    for (let i = 1; i <= count; i++) {
        test(`nav to test ${i}`, async () => {
            const link = page.locator('a#navtest1');
            const title = page.locator('h2#title');
    
            await Promise.all([page.waitForNavigation({url: test1Url, waitUntil: 'networkidle'}), link.click()]);
            await page.waitForSelector('span#done');
            expect(await title.textContent()).toEqual('Test 1');
        });
    
        test(`nav to home ${i}`, async () => {
            const link = page.locator('a#navhome');
            const title = page.locator('h2#title');
    
            await Promise.all([page.waitForNavigation({url: homeUrl, waitUntil: 'networkidle'}), link.click()]);
            expect(await title.textContent()).toEqual('Home');
        });
    }
});