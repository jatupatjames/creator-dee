import { Page } from '@playwright/test';

export const dealLocators = {
  dealMenu: (page: Page) => page.getByRole('link', { name: /ดีล/ }),
  addDealButton: (page: Page) => page.getByRole('button', { name: /เพิ่มดีล/ }),
  brandNameInput: (page: Page) => page.getByLabel(/ชื่อแบรนด์/),
  workType: (page: Page) => page.getByLabel(/ประเภทงาน/),
  price: (page: Page) => page.getByLabel(/ราคา/),
  dealSubmitDate: (page: Page) => page.getByLabel(/วันที่นัดส่งงาน/),
  moreDetailsButton: (page: Page) => page.getByRole('button', { name: /เพิ่มรายละเอียด/ }),
  submitDealButton: (page: Page) => page.locator('.modal-foot .btn.primary')
}
