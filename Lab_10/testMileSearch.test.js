const { Builder, By, Key, until } = require('selenium-webdriver');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

class MilePage {
    constructor(driver) {
        this.driver = driver;
        this.searchInput = By.css('input.header-search');
        this.searchResults = By.className('anons-wrap item-');
    }

    async open() {
        await this.driver.get('https://mile.by/');
    }

    async searchForItem(keyword) {
        let searchInput = await this.driver.findElement(this.searchInput);
        await searchInput.sendKeys(keyword, Key.RETURN);
        await this.driver.wait(until.elementLocated(this.searchResults), 20000);
        await sleep(3000);
    }

    async getSearchResultsCount() {
        const searchResults = await this.driver.findElements(this.searchResults);
        return searchResults.length;
    }
}

describe('Проверка поиска товара на mile.by', () => {
    let driver;
    let milePage;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        milePage = new MilePage(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Поиск товара', async () => {
        try {
            await milePage.open();
            await milePage.searchForItem('корзина');
            const searchResultsCount = await milePage.getSearchResultsCount();
            console.log('Количество результатов поиска:', searchResultsCount);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 30000);
});
