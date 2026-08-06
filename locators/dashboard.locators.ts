import { Page } from '@playwright/test';

export const dashboardLocators = {
  mainMenu: (page: Page) => page.getByRole('link', { name: /หน้าหลัก/ }),
  monthlyRevenueSummary: (page: Page) =>
    page.getByRole('button', { name: /รายได้เดือนนี้/ }),
  outstandingRevenueSummary: (page: Page) =>
    page.getByRole('button', { name: /เงินค้างรับ/ }),
  activeDealsSummary: (page: Page) =>
    page.getByRole('button', { name: /ดีลที่กำลังทำอยู่/ }),
  actionItemsHeading: (page: Page) =>
    page.getByRole('heading', { name: 'สิ่งที่ควรจัดการ' }),
  firstDealEmptyState: (page: Page) => page.getByText('เริ่มดีลแรกของคุณ'),
};
