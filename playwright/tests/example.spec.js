import { test, expect } from '@playwright/test';

const testCases = [
  // --- PASS CASES (Expected to match) ---
  { id: 'Pass_01', input: 'ayubovan!', expected: 'ආයුබෝවන්!' },
  { id: 'Pass_02', input: 'mama yanavaa.', expected: 'මම යනවා.' },
  { id: 'Pass_03', input: 'oyaa kohomadha?', expected: 'ඔයා කොහොමද?' },
  { id: 'Pass_04', input: 'suba upandhinayak veevaa!', expected: 'සුබ උපන්දිනයක් වේවා!' },

  // --- FAIL CASES (Likely to mismatch or show formatting errors) ---
  { id: 'Fail_01', input: 'mamagedharayanavaa', expected: 'මම ගෙදර යනවා' }, // Should fail: No spaces in input
  { id: 'Fail_02', input: 'harrri harrri', expected: 'හරි හරි' }              // Should fail: Typos in Singlish
];

test.describe('Singlish Transliteration: Simple Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/singlish-to-sinhala');
  });

  for (const data of testCases) {
    test(`Testing ${data.id}: ${data.input}`, async ({ page }) => {
      const inputArea = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
      const outputArea = page
        .locator('.card', { has: page.locator('.panel-title', { hasText: 'Sinhala' }) })
        .locator('.w-full.h-80');

      // Action: Fill input
      await inputArea.fill(data.input);

      // Wait for the translator to process and display text
      await expect(outputArea).not.toBeEmpty({ timeout: 7000 });
      
      const actualValue = (await outputArea.innerText()).trim();

      console.log(`ID: ${data.id} | Input: ${data.input} | Output: ${actualValue}`);

      // Assertion: Check if output matches expectation
      expect(actualValue).toBe(data.expected);
    });
  }
});