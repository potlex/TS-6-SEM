const BrowserManager = require('../BrowserManager');
const AddToFavoritePage = require('../pages/AddToFavoritePage');
const Logger = require('../Logger');

describe('Добавление товара в избранное', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Добавление товара в избранное', async () => {
        const page = new AddToFavoritePage(browser);
        try {
            await page.open('https://mile.by/');
            await browser.sleep(7000);

            await page.clickPopupCloseButton();
            await browser.sleep(3000);
            
            await page.clickAnonsWrapItem();
            await browser.sleep(5000);

            await page.clickRejectCookieButton();
            await browser.sleep(1000);

            await page.scrollDown();
            await browser.sleep(3000);

            await page.clickAddToFavoriteButton();
            await browser.sleep(1000);

            Logger.log('Товар успешно добавлен в избранное!');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 300000);
});