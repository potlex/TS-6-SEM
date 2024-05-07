const { By } = require('selenium-webdriver');
const Page = require('../Page');

class RemoveFromCartPage extends Page {
    constructor(driver) {
        super(driver);
        this.anonsWrapItem = By.className('anons-wrap item-');
        this.rejectCookieButton = By.className('reject-cookie');
        this.addToCartButton = By.css('button[data-product-id="1343841"]');
        this.goToCartButton = By.className('copper-bg to-basket');
        this.popupCloseButton = By.className('popup-window-close-icon');
        this.removeButton = By.className('del-table del-table-cart');
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

    async clickRemoveButton() {
        const element = await this.findElement(this.removeButton);
        await this.click(element);
    }
}

module.exports = RemoveFromCartPage;