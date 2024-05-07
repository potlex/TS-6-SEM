const BrowserManager = require('../BrowserManager');
const AddToCart = require('../pages/AddToCart');

describe('Добавление товара в корзину', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Добавление товара в корзину', async () => {
        const page = new AddToCart(browser);
        try {
            await page.open('https://mile.by/');
            await browser.sleep(3000);

            await page.clickAnonsWrapItem();
            await browser.sleep(5000);

            await page.clickPopupCloseButton();
            await browser.sleep(1000);

            await page.clickRejectCookieButton();
            await browser.sleep(3000);

            await page.clickAddToCartButton();
            await browser.sleep(3000);

            await page.clickGoToCartButton();
            await browser.sleep(3000);

            console.log('Товар успешно добавлен в корзину!');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 300000);
});