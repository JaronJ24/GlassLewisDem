const {expect} = require('@playwright/test');

class HomePage {

    constructor(page)
    {
        this.page = page;
        this.countryFilter = page.getByLabel("Search for a country");
        this.countryCheckbox = page.getByRole("checkbox");
        this.countryUpdateButton = page.getByLabel("Country Filter").getByRole("button", { name:"Update"});
        this.gridRows = page.locator("tbody tr");
        this.gridColumns = page.locator("tr th");
        this.nextPageButton = page.locator("a[title='Go to the next page']");
    
    }
    
    async goToHomePage()
    {
        await this.page.goto("https://viewpoint.glasslewis.com/WD/?siteId=DemoClient");
    }
    
    async verifyCountryFilterIsAvailable()
    {
        expect(await this.countryFilter.isVisible());
    }

    async selectCountryFromTheList(countryName)
    {
        await this.countryFilter.fill(countryName);
        await this.countryFilter.press("Enter");
        await this.countryCheckbox.nth(1).click();
    }

    async filterCountryList(countryName)
    {
        await this.countryUpdateButton.click();
    }

    async verifyListAreFilteredByCountry(countryName){
        await expect(this.gridRows.last()).toContainText(countryName);
        const columnIndex = await this.getColumnIndex("Country");
        //Note: Function below checks if the country name value from the selection is the same throughout the list
        await this.checkCountryByRows(columnIndex, countryName);
    }

   
    async verifyCountryListIsTheSame(){
        const columnIndex = await this.getColumnIndex("Country");
        const rows = await this.gridRows;
        const firstRowValue = await rows.first().locator("td").nth(columnIndex).textContent();
        //Note: Function below checks if the country name value retrieved in the first row is the same throughout the list
        await this.checkCountryByRows(columnIndex, firstRowValue);
    }


    async findCompanyNameLink(companyName){
        await this.verifyCountryFilterIsAvailable();
        await this.gridRows.last().isVisible();
        await this.gridRows.last().click();
        await this.checkCompanyName(companyName);
    }

    async getColumnIndex(columnName){
        const columns = await this.gridColumns;
        for(let c=0; c<await columns.count(); c++){
            const column = await columns.nth(c).textContent();
            if(column === columnName){
                const columnIndex = c;
                return columnIndex;
             };
        }
    }

    async checkCountryByRows(columnIndex, countryName){
        const rows = await this.gridRows;
        for(let i=0; i<await rows.count(); i++){
            const rowsCountry = await rows.nth(i).locator("td").nth(columnIndex).textContent();
            expect(rowsCountry === countryName).toBeTruthy();
        }
    }

    async checkCompanyName(companyName){
        var isVisibleFlag = false;
        while (!isVisibleFlag) {
            isVisibleFlag = await this.page.getByLabel(companyName).isVisible()
            if (isVisibleFlag == false){
                const nextPageButtonClass = await this.nextPageButton.getAttribute("class");
                    //Note: If Else condition below checks whether the Next Page button is disabled (meaning already in the last page)
                    if (!nextPageButtonClass.includes("k-state-disabled")){
                        await this.nextPageButton.click();
                        await this.gridRows.last().isVisible();
                        await this.gridRows.last().click();
                        } else{
                        break;
                    }
            }
            else if (isVisibleFlag) {
                this.page.getByLabel(companyName).click();
            } 
        }
    }
    
    }
module.exports = {HomePage};