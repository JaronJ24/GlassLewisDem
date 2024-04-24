const {test, expect} = require('@playwright/test');
const {POManager} = require('../page_objects/POManager.js');

test("TC01", async ({page}) =>{
    const poManager = new POManager(page);
    const homePage = poManager.getHomePage();
    await homePage.goToHomePage();
    await homePage.verifyCountryFilterIsAvailable();
    await homePage.selectCountryFromTheList("Belgium");
    await homePage.filterCountryList();
    await homePage.verifyListAreFilteredByCountry("Belgium");
    await homePage.verifyCountryListIsTheSame();
    await page.pause();
});

