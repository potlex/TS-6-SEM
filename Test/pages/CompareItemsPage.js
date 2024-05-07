const { By } = require('selenium-webdriver');
const Page = require('../Page');

class CompareItemsPage extends Page {
    constructor(driver) {
        super(driver);
        this.rejectCookieButton = By.className('reject-cookie');
        this.addToCompareButton = By.className('but-icon2 element-compare');
        this.goToCompareButton = By.xpath('/html/body/div[5]/div/div[19]/div[2]/a');
        this.closePopupCompare = By.className('close-popup');
        this.popupCloseButton = By.className('popup-window-close-icon');
        this.anonsWrapItemFirst = By.xpath('/html/body/div[2]/div[2]/div[3]/div[4]/div[1]/div[3]');
        this.anonsWrapItemSecond = By.xpath('/html/body/div[2]/div[2]/div[3]/div[4]/div[2]/div[3]');
    }

    async clickAnonsWrapItemFirst() {
        const element = await this.findElement(this.anonsWrapItemFirst);
        await this.click(element);
    }

    async clickAnonsWrapItemSecond() {
        const element = await this.findElement(this.anonsWrapItemSecond);
        await this.click(element);
    }

    async clickRejectCookieButton() {
        const element = await this.findElement(this.rejectCookieButton);
        await this.click(element);
    }

    async clickAddToCompareButton() {
        const element = await this.findElement(this.addToCompareButton);
        await this.click(element);
    }

    async clickPopupCloseButton() {
        const element = await this.findElement(this.popupCloseButton);
        await this.click(element);
    }

    async clickClosePopupCompareButton() {
        const element = await this.findElement(this.closePopupCompare);
        await this.click(element);
    }

    async clickGoToCompareButton() {
        const element = await this.findElement(this.goToCompareButton);
        await this.click(element);
    }

    async scrollDown() {
        await this.executeScript('window.scrollBy(0, 500);');
    }
}

module.exports = CompareItemsPage;