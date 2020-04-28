describe('test application page', () => {
  const { Builder, By, until } = require('selenium-webdriver');
  var assert = require('assert');
  require('chromedriver');
  var driver;

  beforeAll(() => {
    driver = new Builder()
      .forBrowser('chrome')
      .build();
  })

  beforeEach(async () => {
    await driver.get('http://localhost:8080/');
  })

  afterAll(() => {
    driver.quit();
  })

  it('should open approve dialog', async () => {
    driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div[2]/div/div[2]/div/div[1]/button")).click();
    var dialogTitle = driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div[3]/div/div/div[1]/h5")).getText();
    await dialogTitle.then((text) => {
      assert.equal("Подтверждение заявки", text);
    });
  });

  it('should open delete dialog', async () => {
    driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div[2]/div/div[2]/div/div[2]/button")).click();
    var dialogTitle = driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div[3]/div/div/div[1]/h5")).getText();
    await dialogTitle.then((text) => {
      assert.equal("Отклонение заявки", text);
    });
  });

  it('should open edit page', async () => {
    driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div[2]/div/div[2]/div/a/div/button"), 5000));
    driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div[2]/div/div[2]/div/a/div/button")).click();
    var pageTitle = driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]")).getText();
    await pageTitle.then((text) => {
      assert.equal("Редактирование заявки", text);
    });
  });

})


