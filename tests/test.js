const { Builder } = require('selenium-webdriver');
require('selenium-webdriver/chrome');
require('chromedriver');
require('geckodriver');

const rootURL = 'http://localhost:8080/'
const d = new Builder().forBrowser('chrome').build()
let driver;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

it('waits for the driver to start', async () => driver = await d)
it('opens the webpage', async () => await driver.get(rootURL))