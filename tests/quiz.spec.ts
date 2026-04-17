import { test, expect } from "@playwright/test";

test("quiz: all 4 steps navigate to matches with query params", async ({ page }) => {
  await page.goto("/quiz");

  await page.getByRole("button", { name: "Anxiety", exact: true }).click();
  await page.getByRole("button", { name: /^Next/ }).click();

  await page.getByRole("button", { name: "Virtual", exact: true }).click();
  await page.getByRole("button", { name: /^Next/ }).click();

  await page.getByRole("button", { name: "Any", exact: true }).click();
  await page.getByRole("button", { name: /^Next/ }).click();

  await page.getByRole("button", { name: "Aetna", exact: true }).click();
  await page.getByRole("button", { name: /See my matches/i }).click();

  await expect(page).toHaveURL(/\/matches\?/);
  await expect(page.getByRole("heading", { name: /Three therapists for you/i })).toBeVisible();
});

test("quiz: can go back to previous step", async ({ page }) => {
  await page.goto("/quiz");
  await page.getByRole("button", { name: "Anxiety", exact: true }).click();
  await page.getByRole("button", { name: /^Next/ }).click();
  await expect(page.getByRole("heading", { name: /How would you like to meet/i })).toBeVisible();
  await page.getByRole("button", { name: /^Back/ }).click();
  await expect(page.getByRole("heading", { name: /What brings you in/i })).toBeVisible();
});
