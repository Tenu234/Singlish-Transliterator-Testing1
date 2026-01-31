import { test, expect } from '@playwright/test';

const testCases = [
  // --- PASS CASES (24) - Sourced from Appendix 1 [cite: 175-323] ---
  { id: 'Pos_Fun_01', input: 'aayuboovan!', expected: 'ආයුබෝවන්!' }, 
  { id: 'Pos_Fun_02', input: 'mama gedhara yanavaa.', expected: 'මම ගෙදර යනවා.' },
  { id: 'Pos_Fun_03', input: 'mata bath Oonee.', expected: 'මට බත් ඕනී.' },
  { id: 'Pos_Fun_04', input: 'api paasal yanavaa.', expected: 'අපි පාසල් යනවා.' },
  { id: 'Pos_Fun_05', input: 'oyaa hari, ehenam api yamu.', expected: 'ඔයා හරි, එහෙනම් අපි යමු.' },
  { id: 'Pos_Fun_06', input: 'vaessa unath api yanna epaeyi.', expected: 'වැස්ස වුනත් අපි යන්න එපැයි.' },
  { id: 'Pos_Fun_07', input: 'oyaa kavadhdha enna hithan inne?', expected: 'ඔයා කවද්ද එන්න හිතන් ඉන්නේ?' },
  { id: 'Pos_Fun_08', input: 'vahaama enna.', expected: 'වහාම එන්න.' },
  { id: 'Pos_Fun_09', input: 'mama ehema karanavaa.', expected: 'මම එහෙම කරනවා.' },
  { id: 'Pos_Fun_10', input: 'mama ehema karannee naehae.', expected: 'මම එහෙම කරන්නේ නැහැ.' },
  { id: 'Pos_Fun_11', input: 'suba udhaeesanak!', expected: 'සුබ උදෑසනක්!' },
  { id: 'Pos_Fun_12', input: 'mata udhavvak karanna puLuvandha?', expected: 'මට උදව්වක් කරන්න පුළුවන්ද?' },
  { id: 'Pos_Fun_13', input: 'hari, mama karannam.', expected: 'හරි, මම කරන්නම්.' },
  { id: 'Pos_Fun_14', input: 'mata nidhimathayi.', expected: 'මට නිදිමතයි.' },
  { id: 'Pos_Fun_15', input: 'api passe kathaa karamu.', expected: 'අපි පස්සේ කතා කරමු.' },
  { id: 'Pos_Fun_16', input: 'kaeema kanna', expected: 'කෑම කන්න' },
  { id: 'Pos_Fun_17', input: 'hari hari', expected: 'හරි හරි' },
  { id: 'Pos_Fun_18', input: 'mama iiyee gedhara giyaa.', expected: 'මම ඊයේ ගෙදර ගියා.' },
  { id: 'Pos_Fun_19', input: 'WiFi', expected: 'WiFi' },
  { id: 'Pos_Fun_20', input: 'WhatsApp', expected: 'WhatsApp' },
  { id: 'Pos_Fun_21', input: 'siiyaa Colombo yanna hadhannee.', expected: 'සීයාව කොළඹ යන්න හදන්නේ.' },
  { id: 'Pos_Fun_22', input: 'mata Rs. 5000 oonee.', expected: 'මට Rs. 5000 ඕනී.' },
  { id: 'Pos_Fun_23', input: 'seeni 2kg aran enna', expected: 'සීනි 2kg අරන් එන්න.' },
  { id: 'Pos_Fun_24', input: 'ela machan! supiri!!', expected: 'එළ මචන්! සුපිරි!!' },

  // --- FAIL CASES (10) - Stress tests for joined words and logic  ---
  { id: 'Neg_Fun_01', input: 'mamagedharayanavaa', expected: 'මම ගෙදර යනවා' }, // Should Fail: No spaces
  { id: 'Neg_Fun_02', input: 'matapaankannaoonee', expected: 'මට පාන් කන්න ඕනී' }, // Should Fail: No spaces
  { id: 'Neg_Fun_03', input: 'hetaapiyanavaa', expected: 'හෙට අපි යනවා' }, // Should Fail: No spaces
  { id: 'Neg_Fun_04', input: 'harrri harrri', expected: 'හරි හරි' }, // Typo
  { id: 'Neg_Fun_05', input: 'kaemak@kala-ennam', expected: 'කෑමක් කාලා එන්නම්' }, // Symbols
  { id: 'Neg_Fun_06', input: 'ko-heda-yanne', expected: 'කොහේද යන්නේ' }, // Formatting
  { id: 'Neg_Fun_07', input: 'm a m a', expected: 'මම' }, // Broken spacing
  { id: 'Neg_Fun_08', input: 'ZoomMeeting', expected: 'Zoom Meeting' }, // Joined technical terms
  { id: 'Neg_Fun_09', input: '1234kiyanna', expected: '1234 කියන්න' }, // Numbers joined to text
  { id: 'Neg_Fun_10', input: 'api(yanavaa)', expected: 'අපි (යනවා)' } // Brackets without spaces
];

test.describe('Singlish Transliteration Balanced Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/singlish-to-sinhala');
  });

  for (const data of testCases) {
    test(`Testing ${data.id}`, async ({ page }) => {
      const inputArea = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
      const outputArea = page.locator('.card', { has: page.locator('.panel-title', { hasText: 'Sinhala' }) }).locator('.w-full.h-80');

      await inputArea.fill(data.input);
      await page.waitForTimeout(2000); // Critical for the real-time engine [cite: 51]
      
      const actualValue = (await outputArea.innerText()).trim();
      expect(actualValue).toBe(data.expected);
    });
  }
});