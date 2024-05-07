const { By } = require('selenium-webdriver');
const Page = require('../Page');

class CheckInfoPage extends Page {
    constructor(driver) {
        super(driver);
        this.anonsWrapItem = By.className('anons-wrap item-');
        this.rejectCookieButton = By.className('reject-cookie');
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

    async clickPopupCloseButton() {
        const element = await this.findElement(this.popupCloseButton);
        await this.click(element);
    }
}

module.exports = CheckInfoPage;