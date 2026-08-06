import { expect, test } from '@playwright/test';
import { dealLocators } from '../locators/deal.locators';
import { clickDealMenu,clickAddDealButton,inputBrand ,inputWorkType,inputPrice,selectDealDate,clickMoreDetailsButton,submitDealButton} from '../functions/deal.function';
import { deleteDeal } from '../functions/db.functions';

test.describe('สร้างดีล', () => {
    test('TC_Creator_Dee_9 ', async ({
      page,
    }) => {
      await page.goto('/login');
      await expect(dealLocators.dealMenu(page)).toBeVisible();

      //Click on the deal menu
      await clickDealMenu(page);
      await expect(dealLocators.addDealButton(page)).toBeVisible();

      //Click on the add deal button
      await clickAddDealButton(page);
      await expect(dealLocators.brandNameInput(page)).toBeVisible();
      await expect(dealLocators.workType(page)).toBeVisible();
      await expect(dealLocators.price(page)).toBeVisible();
      await expect(dealLocators.dealSubmitDate(page)).toBeVisible();

      //Input the deal information
      await inputBrand(page);
      await inputWorkType(page);
      await inputPrice(page);
      await selectDealDate(page);
      const dealId = await submitDealButton(page);


      await page.pause()

      //Delete deal from the database so that we can run the test again without any issues
      await deleteDeal(dealId);

    });
  });
  