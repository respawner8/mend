import { test, expect } from "@playwright/test";

test("therapist profile renders header and availability", async ({ page }) => {
  await page.goto("/therapists/t1");
  await expect(page.getByRole("heading", { name: "Amara Okonkwo" })).toBeVisible();
  await expect(page.getByText("Availability", { exact: false }).first()).toBeVisible();
});

test("selecting a slot enables the booking button and navigates on click", async ({ page }) => {
  await page.goto("/therapists/t1");

  const slot = page.getByRole("button", { name: /^\d{2}:\d{2}$/ }).first();
  await slot.click();

  const bookBtn = page.getByRole("button", { name: /Book with/i });
  await expect(bookBtn).toBeEnabled();
  await bookBtn.click();

  await expect(page).toHaveURL(/\/book\/t1\?day=.+&time=.+/);
});

test("invalid therapist id returns 404", async ({ page }) => {
  const res = await page.goto("/therapists/nope");
  expect(res?.status()).toBe(404);
});
