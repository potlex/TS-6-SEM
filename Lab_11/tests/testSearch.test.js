const BrowserManager = require('../BrowserManager');
const SearchPage = require('../pages/SearchPage');
const Logger = require('../Logger');

describe('Проверка поиска товара на mile.by', () => {
    let browser;

    beforeAll(() => {
        browser = new BrowserManager();
    });

    afterAll(async () => {
        await browser.quit();
    });

    test('Поиск товара', async () => {
        const page = new SearchPage(browser);
        try {
            await page.open('https://mile.by/');
            await page.searchForItem('корзина');
            const searchResultsCount = await page.getSearchResultsCount();
            Logger.log('Количество результатов поиска:', searchResultsCount);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 100000);
});