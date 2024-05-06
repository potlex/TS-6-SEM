const { By } = require('selenium-webdriver');
const Page = require('../Page');

class SaveStateCartPage extends Page {
    constructor(driver) {
        super(driver);
        this.registerButton = By.css('div.but-login');
        this.emailInput = By.css('input[name="LOGIN"]');
        this.passwordInput = By.css('input[name="PASSWORD"]');
        this.loginButton = By.css('button.btn-login');
        this.anonsWrapItem = By.className('anons-wrap item-');
        this.rejectCookieButton = By.className('reject-cookie');
        this.addToCartButton = By.css('button[data-product-id="66091"]');
        this.goToCartButton = By.className('copper-bg to-basket');
        this.popupCloseButton = By.className('popup-window-close-icon');
        this.logOutButton = By.className('personal-sections exit');
    }

    async clickRegisterButton() {
        await this.click(await this.findElement(this.registerButton));
    }

    async enterEmail(email) {
        const emailField = await this.findElement(this.emailInput);
        await this.sendKeys(emailField, email);
    }

    async enterPassword(password) {
        const passwordField = await this.findElement(this.passwordInput);
        await this.sendKeys(passwordField, password);
    }

    async clickLoginButton() {
        await this.click(await this.findElement(this.loginButton));
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

    async clickLogOutButton() {
        const element = await this.findElement(this.logOutButton);
        await this.click(element);
    }
}

module.exports = SaveStateCartPage;