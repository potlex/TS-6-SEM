const { By } = require('selenium-webdriver');
const Page = require('../Page');

class AddToFavoritePage extends Page {
    constructor(driver) {
        super(driver);
        this.anonsWrapItem = By.className('anons-wrap item-');
        this.rejectCookieButton = By.className('reject-cookie');
        this.addToFavoriteButton = By.xpath('/html/body/div[2]/div[2]/div[3]/a[2]');
        this.popupCloseButton = By.className('popup-window-close-icon');
    }

    async clickAnonsWrapItem() {
        const element = await this.findElement(this.anonsWrapItem);
        await this.click(element);
    }

    async clickRejectCookieButton() {
        const element = await this.findElement(this.rejectCookieButton);
        await this.click(element);
    }

    async clickAddToFavoriteButton() {
        const element = await this.findElement(this.addToFavoriteButton);
        await this.click(element);
    }

    async clickPopupCloseButton() {
        const element = await this.findElement(this.popupCloseButton);
        await this.click(element);
    }

    async scrollDown() {
        await this.executeScript('window.scrollBy(0, 500);');
    }
}

module.exports = AddToFavoritePage;