import { test, expect } from '@playwright/test';

test('booking flow', async ({ page }) => {
  // 1. Navigate to the homepage
  await page.goto('http://localhost:3000');

  // 2. Verify main title is visible
  await expect(page.locator('h1')).toContainText('Discover');

  // 3. Fill in the Check In date picker
  const today = new Date().toISOString().split('T')[0];
  await page.locator('input[type="date"]').fill(today);

  // 4. Fill in Total travel days
  await page.locator('input[type="number"]').first().fill('4');

  // 5. Fill in People count
  await page.locator('input[type="number"]').nth(1).fill('2');

  // 6. Click the Search button
  await page.locator('button:has-text("Search")').click();

  // 7. Wait for the Trip Summary modal
  const modal = page.locator('text=Trip Summary');
  await expect(modal).toBeVisible();

  // 8. Verify summary details
  await expect(page.locator('text=Locations')).toBeVisible();
  await expect(page.locator('text=Check In Date')).toBeVisible();
  await expect(page.locator('text=Total travel days')).toBeVisible();
  await expect(page.locator('text=People')).toBeVisible();

  // 9. Fill out the form in the modal
  await page.locator('input[type="text"]').fill('Test User');
  await page.locator('input[type="email"]').fill('test@example.com');
  await page.locator('textarea').fill('Looking forward to the trip!');

  // 10. Submit the booking request
  await page.locator('button[type="submit"]:has-text("Send")').click();

  // 11. Wait for the success message
  await expect(page.locator('text=Your request has been sent!')).toBeVisible();
}); 