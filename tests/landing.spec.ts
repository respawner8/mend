import { test, expect } from "@playwright/test";

test("landing renders hero and CTA navigates to quiz", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /without the search/i })).toBeVisible();
  await page.getByRole("link", { name: /Find a therapist/i }).first().click();
  await expect(page).toHaveURL(/\/quiz$/);
  await expect(page.getByRole("heading", { name: /What brings you in/i })).toBeVisible();
});
