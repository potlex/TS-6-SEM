const { Builder, By, Key, until } = require('selenium-webdriver');

class BrowserManager {
    constructor() {
        this.driver = new Builder().forBrowser('chrome').build();
    }

    async quit() {
        await this.driver.quit();
    }

    async sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async open(url) {
        console.log('Открытие страницы:', url);
        await this.driver.get(url);
    }

    async findElement(locator) {
        console.log('Поиск элемента:', locator);
        return await this.driver.findElement(locator);
    }

    async findElements(locator) {
        console.log('Поиск элементов:', locator);
        return await this.driver.findElements(locator);
    }

    async click(element) {
        console.log('Клик по элементу:', element);
        await element.click();
    }

    async sendKeys(element, keys) {
        console.log('Ввод текста:', keys);
        await element.sendKeys(keys);
    }

    async waitForElement(locator, timeout) {
        console.log('Ожидание элемента:', locator);
        await this.driver.wait(until.elementLocated(locator), timeout);
    }

    async executeScript(script, ...args) {
        return await this.driver.executeScript(script, ...args);
    }
}

module.exports = BrowserManager;