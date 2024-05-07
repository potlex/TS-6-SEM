const BrowserManager = require('../BrowserManager');
const ChangeCountPage = require('../pages/ChangeCountPage');
const Logger = require('../Logger');

describe('Изменение количества товара в корзине', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Изменение количества товара в корзине', async () => {
        const page = new ChangeCountPage(browser);
        try {
            await page.open('https://mile.by/');
            await browser.sleep(3000);

            await page.clickAnonsWrapItem();
            await browser.sleep(5000);

            await page.clickPopupCloseButton();
            await browser.sleep(1000);

            await page.clickRejectCookieButton();
            await browser.sleep(1000);

            await page.clickAddToCartButton();
            await browser.sleep(1000);

            await page.clickGoToCartButton();
            await browser.sleep(1000);

            await page.clickShareButton();
            await browser.sleep(3000);

            await page.clickPlusButton();
            await browser.sleep(3000);

            Logger.log('Изменение количества товара в корзине!');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 300000);
});