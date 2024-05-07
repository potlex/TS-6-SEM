const BrowserManager = require('../BrowserManager');
const LoginPage = require('../pages/LoginPage');
const Logger = require('../Logger');

describe('Вход пользователя', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Вход пользователя на сайт', async () => {
        const page = new LoginPage(browser);
        try {
            await page.open('https://mile.by');

            await page.clickRegisterButton();
            await page.enterEmail('potapovic123@gmail.com');
            await page.enterPassword('Kyper2019!');
            await page.clickLoginButton();

            await browser.sleep(3000);

            const currentURL = await browser.driver.getCurrentUrl();
            expect(currentURL).toBe('https://mile.by/personal/');
            Logger.log('Пользователь успешно вошел на сайт');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 50000);
});