const BrowserManager = require('../BrowserManager');
const ReadReviewsPage = require('../pages/ReadReviewsPage');

describe('Просмотр отзывов о товаре', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Просмотр отзывов о товаре', async () => {
        const page = new ReadReviewsPage(browser);
        try {
            await page.open('https://mile.by/');
            await browser.sleep(3000);

            await page.clickAnonsWrapItem();
            await browser.sleep(5000);

            await page.clickPopupCloseButton();
            await browser.sleep(3000);

            await page.clickRejectCookieButton();
            await browser.sleep(3000);

            await page.clickCheckReviewsButton();
            await browser.sleep(3000);

            console.log('Отзывы о товаре успешно открыты!');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 300000);
});