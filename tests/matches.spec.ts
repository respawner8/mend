import { test, expect } from "@playwright/test";

test("matches: shows top 3 match cards with match % and links to profile", async ({ page }) => {
  await page.goto("/matches?s=anxiety&m=virtual&g=any&i=aetna");
  await expect(page.getByRole("heading", { name: "Top matches" })).toBeVisible();

  await expect(page.getByText(/\d+% match/).first()).toBeVisible();

  const firstMatchLink = page.locator("a[href^='/therapists/']").first();
  await firstMatchLink.click();
  await expect(page).toHaveURL(/\/therapists\/t\d/);
});
