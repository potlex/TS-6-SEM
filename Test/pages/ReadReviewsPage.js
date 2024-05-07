const { By } = require('selenium-webdriver');
const Page = require('../Page');

class ReadReviewsPage extends Page {
    constructor(driver) {
        super(driver);
        this.anonsWrapItem = By.xpath('/html/body/div[5]/div[2]/div[2]');
        this.rejectCookieButton = By.className('reject-cookie');
        this.checkReviewsButton = By.xpath('/html/body/div[2]/div[3]/div[5]');
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

    async clickCheckReviewsButton() {
        const element = await this.findElement(this.checkReviewsButton);
        await this.click(element);
    }

    async clickPopupCloseButton() {
        const element = await this.findElement(this.popupCloseButton);
        await this.click(element);
    }
}

module.exports = ReadReviewsPage;