const BrowserManager = require('../BrowserManager');
const CheckInfoPage = require('../pages/CheckInfoPage');

describe('Получение полной информации о товаре', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Получение полной информации о товаре', async () => {
        const page = new CheckInfoPage(browser);
        try {
            await page.open('https://mile.by/');
            await browser.sleep(3000);

            await page.clickAnonsWrapItem();
            await browser.sleep(5000);

            await page.clickRejectCookieButton();
            await browser.sleep(3000);

            console.log('Полная информация о товаре!');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 300000);
});