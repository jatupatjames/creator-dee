import { Page } from '@playwright/test';

const THAI_MONTHS_FULL = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
];

const THAI_MONTHS_SHORT = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
];

/** Converts a Gregorian year to Buddhist Era (this app displays 2569 for 2026) */
function toBuddhistYear(date: Date): number {
  return date.getFullYear() + 543;
}

/**
 * Selects a date in the "เลือกวันที่" datepicker.
 * Assumes the calendar dialog (.dp-pop) is already open.
 */
export async function pickDateFromCalendar(page: Page, targetDate: Date): Promise<void> {
  const dialog = page.locator('.dp-pop[role="dialog"]');

  // Month select — options use 0-indexed values (0 = มกราคม ... 11 = ธันวาคม)
  const monthSelect = dialog.getByRole('combobox', { name: 'เดือน' });
  await monthSelect.selectOption({ value: targetDate.getMonth().toString() });

  // Year select — confirm its aria-label/options match this pattern before running;
  // not visible in the screenshot yet.
  const yearSelect = dialog.locator('select.dp-sel').nth(1);
  await yearSelect.selectOption({ label: toBuddhistYear(targetDate).toString() });

  // Click the target day — aria-label format is "D MMM YY" e.g. "6 ส.ค. 69"
  const day = targetDate.getDate();
  const shortMonth = THAI_MONTHS_SHORT[targetDate.getMonth()];
  const shortYearBE = (toBuddhistYear(targetDate) % 100).toString().padStart(2, '0');
  const ariaLabel = `${day} ${shortMonth} ${shortYearBE}`;

  await dialog.getByRole('button', { name: ariaLabel, exact: true }).click();
}