const playwright = require('@playwright/test');
const {POManager} = require('../../page_objects/POManager');
const {Before,AfterStep,Status} = require('@cucumber/cucumber');
const { truncate } = require('fs/promises');

Before ({timeout: 60 * 1000}, async function () {
    const browser = await playwright.chromium.launch({headless: true});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

AfterStep ({timeout: 60 * 1000}, async function ({result, pickle}) {
    if (result.status === Status.FAILED){
        const image = await this.page.screenshot({path: './test-results/screenshot/' + pickle.name +'.png'});
        this.attach(image, "image/png");
    }
});
