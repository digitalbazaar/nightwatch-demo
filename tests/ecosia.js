describe('Ecosia.org Demo', function() {

  before(browser => browser.url(
    'https://chapi-demo-wallet.digitalbazaar.com/'));

  test('Demo test ecosia.org', async function(browser) {
    await browser.waitForElementVisible('body');
    await browser.assert.titleContains('Minimal Demo Wallet');
    await browser.useXpath();
    await browser.assert.visible('//html/body/dialog/div/iframe');

    // switch to the CHAPI frame
    await browser.frame(0);

    // make assertions about the available buttons
    await browser.assert.visible('//button[1]');
    await browser.assert.containsText('//button[1]', 'Block');
    await browser.assert.visible('//button[2]');
    await browser.assert.containsText('//button[2]', 'Allow');

    // click a button based on its text
    await browser.click('//button[contains(text(),"Allow")]');

    // address the main window
    await browser.frame(null);

    // switch back to using css selectors
    await browser.useCss();
    await browser.assert.visible('#loginButton');
    await browser.click('#loginButton');
    await browser.pause(5000);
  });

  after(browser => browser.end());
});
