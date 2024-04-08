const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Options } = chrome;

describe('Turtle routes', () => {
    let driver;

    beforeAll(async () => {
        const options = new Options();
        options.addArguments("--headless");
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should return 400 if id is not a number', async () => {
        await driver.get('http://localhost:3000/api/turtles/abc');
        const responseBody = await driver.findElement(By.css('body')).getText();
        const error = JSON.parse(responseBody);
        expect(error.error).toBe('Invalid ID');
    });

    it('should return 404 if turtle with given id does not exist', async () => {
        await driver.get('http://localhost:3000/api/turtles/1');
        const responseBody = await driver.findElement(By.css('body')).getText();
        const turtle = JSON.parse(responseBody);
        expect(turtle.error).toBe(undefined);
    });
    
    it('should return turtle if id is valid', async () => {
        await driver.get('http://localhost:3000/api/turtles/1');
        const responseBody = await driver.findElement(By.css('body')).getText();
        const turtle = JSON.parse(responseBody);
        expect(turtle).toEqual({ id: 1, name: 'Leonardo', color: 'Blue', weaponId: 1, favoritePizzaId: 2, secondFavoritePizzaId: 5, image: null });
    });
});