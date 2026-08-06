import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/line-user.json';

setup('login with LINE OAuth', async ({ page, context }) => {
  await page.goto('/login');

  await page.getByRole('button', { name: /เข้าด้วย LINE/ }).click();

  // Complete LINE OAuth manually in the headed browser, then press Resume.
  await page.pause();

  const appPage =
    context
      .pages()
      .find((candidate) => !candidate.url().includes('/login')) ?? page;

  await appPage.bringToFront();
  await expect(appPage.getByText('หน้าหลัก').first()).toBeVisible({
    timeout: 120_000,
  });

  await context.storageState({ path: authFile });
});
