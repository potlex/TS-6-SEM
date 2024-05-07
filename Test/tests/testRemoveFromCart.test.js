const BrowserManager = require('../BrowserManager');
const RemoveFromCartPage = require('../pages/RemoveFromCartPage');
const Logger = require('../Logger');

describe('Удаление товара из корзины', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Удаление товара из корзины', async () => {
        const page = new RemoveFromCartPage(browser);
        try {
            await page.open('https://mile.by/');
            await browser.sleep(3000);

            await page.clickAnonsWrapItem();
            await browser.sleep(5000);

            await page.clickRejectCookieButton();
            await browser.sleep(3000);

            await page.clickAddToCartButton();
            await browser.sleep(3000);

            await page.clickGoToCartButton();
            await browser.sleep(3000);

            Logger.log('Товар успешно удалён из корзины!');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 300000);
});