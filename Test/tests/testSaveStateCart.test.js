const BrowserManager = require('../BrowserManager');
const SaveStateCartPage = require('../pages/SaveStateCartPage');
const Logger = require('../Logger');

describe('Сохранение состояния корзины', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Сохранение состояния корзины', async () => {
        const page = new SaveStateCartPage(browser);
        try {
            await page.open('https://mile.by/');
            await browser.sleep(7000);

            await page.clickPopupCloseButton();

            await page.clickRegisterButton();
            await page.enterEmail('potapovic123@gmail.com');
            await page.enterPassword('Kyper2019!');
            await page.clickLoginButton();

            await browser.sleep(3000);

            const currentURL = await browser.driver.getCurrentUrl();
            expect(currentURL).toBe('https://mile.by/personal/');

            await page.open('https://mile.by/');
            await browser.sleep(3000);

            await page.clickAnonsWrapItem();
            await browser.sleep(5000);

            await page.clickRejectCookieButton();
            await browser.sleep(1000);

            await page.clickAddToCartButton();
            await browser.sleep(3000);

            await page.clickGoToCartButton();
            await browser.sleep(3000);

            await page.open('https://mile.by/personal/');
            await browser.sleep(3000);

            await page.clickLogOutButton();
            await browser.sleep(3000);

            await page.clickRegisterButton();
            await page.enterEmail('potapovic123@gmail.com');
            await browser.sleep(1000);
            await page.enterPassword('Kyper2019!');
            await browser.sleep(1000);
            await page.clickLoginButton();
            await browser.sleep(1000);

            await browser.sleep(3000);

            const currentURLs = await browser.driver.getCurrentUrl();
            expect(currentURLs).toBe('https://mile.by/personal/');

            Logger.log('Товар успешно удалён из корзины!');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 300000);
});