describe('Ecosia.org Demo', function() {

  before(browser => browser.url(
    'https://chapi-demo-wallet.digitalbazaar.com/'));

  test('Demo test ecosia.org', async function(browser) {
    await browser.waitForElementVisible('body');
    await browser.assert.titleContains('Minimal Demo Wallet');
    await browser.useXpath();
    await browser.assert.visible('//html/body/dialog/div/iframe');
    await browser.frame(0);
    await browser.assert.visible('//button[1]');
    await browser.assert.containsText('//button[1]', 'Block');
    await browser.assert.visible('//button[2]');
    await browser.assert.containsText('//button[2]', 'Allow');
    await browser.click('//button[2]');
    await browser.frame(null);
    await browser.useCss();
    await browser.assert.visible('#loginButton');
    await browser.click('#loginButton');
    await browser.pause(5000);
  });

  after(browser => browser.end());
});
