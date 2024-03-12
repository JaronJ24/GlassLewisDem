const playwright = require('@playwright/test');
const {POManager} = require('../../page_objects/POManager');
const {Before,AfterStep} = require('@cucumber/cucumber');

/*Before ({timeout: 60 * 1000}, async ()=>{
    const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
    this.homePage = this.poManager.getHomePage();
});




AfterStep ({timeout: 60 * 1000}, async ({result})=> {
    if (result.status === Status.Failed){
        await this.page.screenshot();
    }
});*/
