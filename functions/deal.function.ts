import { Page } from '@playwright/test';
import { dealLocators } from '../locators/deal.locators';
import { pickDateFromCalendar } from './selectDate.function';
import { deal } from '../data/deal';

export async function clickDealMenu(page: Page) {
    await dealLocators.dealMenu(page).click();
}

export async function clickAddDealButton(page: Page) {
    await dealLocators.addDealButton(page).click();
}

export async function inputBrand(page: Page) {
    await dealLocators.brandNameInput(page).fill(deal.brand);
}

export async function inputWorkType(page: Page) {
    await dealLocators.workType(page).fill(deal.workType);
}

export async function inputPrice(page: Page) {
    await dealLocators.price(page).fill(deal.price);
}

export async function selectDealDate(page: Page) {
    await dealLocators.dealSubmitDate(page).click(); // opens the calendar
    await pickDateFromCalendar(page, new Date(deal.dealSubmitDate)); // picks 15 กันยายน 2569
}

export async function clickMoreDetailsButton(page: Page) {
    await dealLocators.moreDetailsButton(page).click();
}

export async function submitDealButton(page: Page): Promise<number> {
    const [response] = await Promise.all([
        page.waitForResponse(res =>
          res.url().includes('/deals') && res.request().method() === 'POST'
        ),
        await dealLocators.submitDealButton(page).click()
    ]);

    const responseBody = await response.json();
    const dealId: number = responseBody.deal.id;

    return dealId;
}

