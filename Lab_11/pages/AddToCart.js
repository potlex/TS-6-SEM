const { By } = require('selenium-webdriver');
const Page = require('../Page');

class AddToCart extends Page {
    constructor(driver) {
        super(driver);
        this.anonsWrapItem = By.className('anons-wrap item-');
        this.rejectCookieButton = By.className('reject-cookie');
        this.addToCartButton = By.xpath('/html/body/div[2]/div[2]/div[3]/form/button');
        this.goToCartButton = By.className('copper-bg to-basket');
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

    async clickAddToCartButton() {
        const element = await this.findElement(this.addToCartButton);
        await this.click(element);
    }

    async clickGoToCartButton() {
        const element = await this.findElement(this.goToCartButton);
        await this.click(element);
    }

    async clickPopupCloseButton() {
        const element = await this.findElement(this.popupCloseButton);
        await this.click(element);
    }
}

module.exports = AddToCart;