import { test, expect } from "@playwright/test";

test("booking form: blocks submit with missing required fields", async ({ page }) => {
  await page.goto("/book/t1?day=2026-04-19&time=14:00");
  await page.getByRole("button", { name: /Confirm booking/i }).click();
  await expect(page.getByText("Required").first()).toBeVisible();
});

test("booking form: success state shows after valid submit", async ({ page }) => {
  await page.goto("/book/t1?day=2026-04-19&time=14:00");

  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Phone").fill("555-0100");

  await page.getByText(/Mend is a booking tool/).click();

  await page.getByRole("button", { name: /Confirm booking/i }).click();
  await expect(page.getByRole("heading", { name: /You.*re booked with Amara/ })).toBeVisible();
});

test("missing query params on /book returns 404", async ({ page }) => {
  const res = await page.goto("/book/t1");
  expect(res?.status()).toBe(404);
});
