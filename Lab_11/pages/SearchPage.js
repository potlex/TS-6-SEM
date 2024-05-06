const { By } = require('selenium-webdriver');
const Page = require('../Page');

class SearchPage extends Page {
    constructor(driver) {
        super(driver);
        this.searchInput = By.css('input.header-search');
        this.searchResults = By.className('anons-wrap item-');
    }

    async searchForItem(keyword) {
        const searchInput = await this.findElement(this.searchInput);
        await this.sendKeys(searchInput, keyword + Key.RETURN);
        await this.waitForElement(this.searchResults, 20000);
        await this.sleep(3000);
    }

    async getSearchResultsCount() {
        const searchResults = await this.findElements(this.searchResults);
        return searchResults.length;
    }
}

module.exports = SearchPage;