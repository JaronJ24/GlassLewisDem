const {expect} = require('@playwright/test');

class VoteCardPage{
constructor(page)
{
    this.page = page;
    this.companyNameLogo = page.locator("#detail-issuer-name");
    this.companyNameBanner = page.locator("div h2");

}

async findVoteCardPage(companyName)
{
    await expect(this.page).toHaveTitle(/Sample Disclosure/);
    await expect(this.companyNameLogo).toHaveText(companyName);
}

async checkCompanyBanner(companyName)
{
    await expect(this.companyNameBanner.first()).toContainText(companyName);
}

}
module.exports = {VoteCardPage};