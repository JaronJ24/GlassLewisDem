const {Given, When, Then } = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');
const {POManager} = require('../../page_objects/POManager');

Given('the user is on the landing page for the WD site', {timeout: 60 * 1000}, async function () {
    /*const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
    this.homePage = this.poManager.getHomePage();*/
    this.homePage = this.poManager.getHomePage();
    await this.homePage.goToHomePage();
  });

Given('the Country filter is available', {timeout: 60 * 1000}, async function () {
    await this.homePage.verifyCountryFilterIsAvailable();
  });

When('the user selects {string} from the Country filter list on the left panel', {timeout: 60 * 1000}, async function (countryName) {
    await this.homePage.selectCountryFromTheList(countryName);
  });

When('click on Update button for the country filter list', {timeout: 60 * 1000}, async function () {
    await this.homePage.filterCountryList();
  });

Then('the grid displays all meetings that are associated with the country {string}', {timeout: 60 * 1000}, async function (countryName) {
    await this.homePage.verifyListAreFilteredByCountry(countryName);
  });

Then('no meetings associated with any other country appear on the list', {timeout: 60 * 1000}, async function () {
    await this.homePage.verifyCountryListIsTheSame();
  });

When('the user clicks the Company Name {string} hyperlink', {timeout: 60 * 1000}, async function (companyName) {
    await this.homePage.findCompanyNameLink(companyName);
  });

Then('the user lands on the {string} vote card page.', {timeout: 60 * 1000}, async function (companyName) {
    this.voteCardpage = this.poManager.getVoteCardPage();
    await this.voteCardpage.findVoteCardPage(companyName);
  });

Then('{string} should appear in the top banner.', {timeout: 60 * 1000}, async function (companyName) {
    await this.voteCardpage.checkCompanyBanner(companyName);
  });