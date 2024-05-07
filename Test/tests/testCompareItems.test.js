const BrowserManager = require('../BrowserManager');
const CompareItemsPage = require('../pages/CompareItemsPage');
const Logger = require('../Logger');

describe('Добавление товаров в сравнение', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Добавление товаров в сравнение', async () => {
        const page = new CompareItemsPage(browser);
        try {
            await page.open('https://mile.by/catalog/sukhie-smesi-i-gruntovki/');
            await browser.sleep(7000);

            await page.clickPopupCloseButton();
            await browser.sleep(1000);

            await page.scrollDown();
            await browser.sleep(1000);

            await page.clickAnonsWrapItemFirst();
            await browser.sleep(1000);

            await page.clickRejectCookieButton();
            await browser.sleep(1000);
            
            await page.scrollDown();
            await browser.sleep(1000);
            
            await page.clickAddToCompareButton();
            await browser.sleep(1000);

            await page.clickClosePopupCompareButton();
            await browser.sleep(1000);

            await page.open('https://mile.by/catalog/sukhie-smesi-i-gruntovki/');
            await browser.sleep(7000);

            await page.clickAnonsWrapItemSecond();
            await browser.sleep(1000);

            await page.scrollDown();
            await browser.sleep(1000);
            
            await page.clickAddToCompareButton();
            await browser.sleep(1000);

            await page.clickGoToCompareButton();
            await browser.sleep(1000);

            Logger.log('Товары успешно добавлены в сравнение!');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 300000);
});