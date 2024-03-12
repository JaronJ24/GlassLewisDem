const {test, expect} = require('@playwright/test');

test("TC01", async ({page}) =>{
    await page.goto("https://viewpoint.glasslewis.com/WD/?siteId=DemoClient");
    expect(await page.locator("#txt-multiselect-static-search-CountryFilter").isVisible());
    await page.getByLabel("Search for a country").fill("Belgium");
    await page.getByLabel("Search for a country").press("Enter");
    //await page.getByRole("checkbox", {name:"Belgium"}).click();
    await page.getByRole("checkbox").nth(1).click();
    //await page.getByRole("checkbox").filter({hasText: "Belgium"}).click()
    await page.pause();
    await page.getByLabel("Country Filter").getByRole("button", { name:"Update"}).click();
    await expect(page.locator("tbody tr").last()).toContainText("Belgium");

    const columns = await page.locator("tr th");
    const rows = await page.locator("tbody tr");
    for(let c=0; c<await columns.count(); c++){
        const columnName = await columns.nth(c).textContent();
        console.log(columnName);
        if(columnName === "Country"){
            const columnIndex = c;
            
            for(let i=0; i<await rows.count(); i++){
            const rowsCountry = await rows.nth(i).locator("td").nth(columnIndex).textContent();
            expect(rowsCountry === "Belgium").toBeTruthy();
        }
        };
    }
    


    
    await page.pause();
});


test.only("TC02", async ({page}) =>{
    await page.goto("https://viewpoint.glasslewis.com/WD/?siteId=DemoClient");
    
    await page.pause();
    await expect(page.locator("tbody tr").last()).toBeVisible();
    const companyName = "Acron";
    const columns = await page.locator("tr th");
    console.log(await columns.count());
    const rows = await page.locator("tbody tr");
    console.log(await rows.count());
    var isVisibleFlag = false;
    
    

    while (!isVisibleFlag) {
        isVisibleFlag = await page.getByLabel("Acron").isVisible()
        console.log(isVisibleFlag);
        await page.pause();
        if (isVisibleFlag == false){
            const nextPageButton = await page.locator("a[title='Go to the next page']").getAttribute("class");
            console.log(nextPageButton);
            if (!nextPageButton.includes("k-state-disabled")){
                await page.locator("a[title='Go to the next page']").click();
                await expect(page.locator("tbody tr").last()).toBeVisible();
            } else{
                break;
            }
        } 
    }
    /*for(let c=0; c<await columns.count(); c++){
        const columnName = await columns.nth(c).textContent();
        console.log(columnName);
        if(columnName === "Company Name"){
            const columnIndex = c;
            
            for(let i=0; i<await rows.count(); i++){
            const rowsCompany = await rows.nth(i).locator("td").nth(columnIndex).textContent();
            console.log(rowsCompany);
            if (rowsCompany === companyName) {
                const companyLink = await rows.nth(i).locator("td a").nth(columnIndex);
                await companyLink.click();
                break;
            } else if (rowsCompany != companyName && i == await rows.count()-1){
                console.log("hello");
                i = 0;
                await page.locator("a[title='Go to the next page']").click();
            }

        }
        };
    }*/
    
   /* while (true){
        try{
        await page.getByLabel("Activision Blizzard Inc").isVisible();
        break;
        }
        catch{
            console.log("hello");
            await page.locator("a[title='Go to the next page']").click();

        };
    };
    await page.pause();
    await page.getByLabel("1&1 AG").click();

    await expect(page.locator("#detail-issuer-name")).toHaveText("1&1 AG");
    await expect(page.locator("div h2").first()).toContainText("1&1 AG");*/

    //const value = await expect(page.getByLabel("Activision Blizzard Inc")).toBeHidden();
    //console.log(value);

    
    

    await page.pause();

});

