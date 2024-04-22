const { Builder, By } = require('selenium-webdriver');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

class MilePage {
    constructor(driver) {
        this.driver = driver;
        this.anonsWrapItem = By.className('anons-wrap item-');
        this.rejectCookieButton = By.className('reject-cookie');
        this.addToCartButton = By.css('button[data-product-id="2050453"]');
        this.goToCartButton = By.className('copper-bg to-basket');
    }

    async open() {
        await this.driver.get('https://mile.by/');
    }

    async clickAnonsWrapItem() {
        const element = await this.driver.findElement(this.anonsWrapItem);
        await element.click();
    }

    async clickRejectCookieButton() {
        const element = await this.driver.findElement(this.rejectCookieButton);
        await element.click();
    }

    async clickAddToCartButton() {
        const element = await this.driver.findElement(this.addToCartButton);
        await element.click();
    }

    async clickGoToCartButton() {
        const element = await this.driver.findElement(this.goToCartButton);
        await element.click();
    }
}

describe('Добавление товара в корзину', () => {
    let driver;
    let page;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        page = new MilePage(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Добавление товара в корзину', async () => {
        try {
            await page.open();
            await sleep(3000);

            await page.clickAnonsWrapItem();
            await sleep(5000);

            await page.clickRejectCookieButton();
            await sleep(3000);

            await page.clickAddToCartButton();
            await sleep(3000);

            await page.clickGoToCartButton();
            await sleep(3000);

            console.log('Товар успешно добавлен в корзину!');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 30000);
});