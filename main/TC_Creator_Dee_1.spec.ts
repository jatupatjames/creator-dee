import { expect, test } from '@playwright/test';
import { dashboardLocators } from '../locators/dashboard.locators';

test.describe('Creator Dee - หน้าหลัก', () => {
  test('TC_Creator_Dee_1 - บัญชีที่ยังไม่มีข้อมูลดีลแสดง summary เป็น 0', async ({
    page,
  }) => {
    await page.goto('/login');

    await expect(dashboardLocators.mainMenu(page)).toBeVisible();
    await dashboardLocators.mainMenu(page).click();

    await expect(dashboardLocators.actionItemsHeading(page)).toBeVisible();
    await expect(dashboardLocators.firstDealEmptyState(page)).toBeVisible();

    await expect(dashboardLocators.monthlyRevenueSummary(page)).toContainText(
      /฿\s*0/,
    );
    await expect(dashboardLocators.outstandingRevenueSummary(page)).toContainText(
      /฿\s*0/,
    );
    await expect(dashboardLocators.activeDealsSummary(page)).toContainText(
      /0\s*ดีล/,
    );
  });
});
