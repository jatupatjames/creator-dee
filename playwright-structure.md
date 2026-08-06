# Playwright Project Structure

This document describes the recommended folder structure for organizing a Playwright automation project.

```
project-root/
├── data/
├── locators/
├── functions/
├── main/
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## 1. `data/` — Test Data

Stores test data used across test cases (JSON, CSV, or TS/JS objects).

```
data/
├── users.json
├── login-data.ts
└── products.json
```

**Example (`data/login-data.ts`):**
```ts
export const loginData = {
  validUser: { username: "testuser", password: "Test@123" },
  invalidUser: { username: "wronguser", password: "wrongpass" },
};
```

## 2. `locators/` — Element Locators

Stores selectors/locators for each page, separated by page or module (Page Object style).

```
locators/
├── loginPage.locators.ts
├── homePage.locators.ts
└── dashboardPage.locators.ts
```

**Example (`locators/loginPage.locators.ts`):**
```ts
export const loginLocators = {
  usernameInput: "#username",
  passwordInput: "#password",
  loginButton: "button[type='submit']",
  errorMessage: ".error-message",
};
```

## 3. `functions/` — Reusable Functions

Stores reusable actions/helper functions (e.g., login, navigation, form filling) built using the locators.

```
functions/
├── login.functions.ts
├── navigation.functions.ts
└── common.functions.ts
```

**Example (`functions/login.functions.ts`):**
```ts
import { Page } from "@playwright/test";
import { loginLocators } from "../locators/loginPage.locators";

export async function login(page: Page, username: string, password: string) {
  await page.fill(loginLocators.usernameInput, username);
  await page.fill(loginLocators.passwordInput, password);
  await page.click(loginLocators.loginButton);
}
```

## 4. `main/` — Test Runner Files

Stores the actual test spec files that run the tests, combining `data`, `locators`, and `functions`.

```
main/
├── login.spec.ts
├── checkout.spec.ts
└── dashboard.spec.ts
```

**Example (`main/login.spec.ts`):**
```ts
import { test, expect } from "@playwright/test";
import { login } from "../functions/login.functions";
import { loginData } from "../data/login-data";

test("valid user can log in", async ({ page }) => {
  await page.goto("https://example.com/login");
  await login(page, loginData.validUser.username, loginData.validUser.password);
  await expect(page).toHaveURL(/dashboard/);
});
```

## Running Tests

```bash
npx playwright test main/
```

## Summary

| Folder       | Purpose                                  |
|--------------|-------------------------------------------|
| `data/`      | Test input data (credentials, payloads)   |
| `locators/`  | Element selectors per page                |
| `functions/` | Reusable actions built from locators      |
| `main/`      | Actual test files that execute the tests  |
