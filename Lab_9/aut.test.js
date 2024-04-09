test('проверка поиска товара на 5element.by', async () => {
    const { Builder, By, Key, until } = require('selenium-webdriver');
  
    const driver = await new Builder().forBrowser('chrome').build();
  
    try {
      await driver.get('https://5element.by/');
      const searchField = await driver.findElement(By.css('input[placeholder="Поиск товара"]'));
      await searchField.click();
      await searchField.sendKeys('IPhone 15', Key.RETURN);
      await driver.wait(until.elementLocated(By.className('product-item')), 5000);
      const searchResults = await driver.findElements(By.className('product-item'));
      console.log('Количество результатов поиска:', searchResults.length);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    } finally {
      await driver.quit();
    }
});