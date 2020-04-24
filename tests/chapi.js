describe('CHAPI Flow Demo', function() {

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
    await browser.pause(1000);

    const walletWindowHandle = await browser.windowHandle();
    console.log('WWWWWWW', walletWindowHandle);

    // open new tab for issuer
    const {value: {handle: issuerHandle}} = await browser.openNewWindow();
    await browser.switchWindow(issuerHandle);
    await browser.url('https://chapi-demo-issuer.digitalbazaar.com/');

    await browser.waitForElementVisible('body');
    await browser.assert.titleContains('Minimal Demo Issuer');

    // click receive credential which is `a` not a button
    await browser.assert.visible('#receiveButton');
    await browser.click('#receiveButton');

    await browser.useXpath();
    await browser.assert.visible('//html/body/dialog/div/iframe');

    // switch to the CHAPI frame
    await browser.frame(0);

    // click a button based on its text
    await browser.click('//button[contains(text(),"Next")]');

    const demoWallet = '//strong[contains(text(),"Demo Wallet")]';
    await browser.assert.visible(demoWallet);
    await browser.click(demoWallet);

    // this works
    await browser.assert.visible('//html/body/dialog/div/iframe');

    // a = https://chapi-demo-wallet.digitalbazaar.com/wallet-worker.html
    const a = await browser.getAttribute('//html/body/dialog/div/iframe', 'src');
    console.log('AAAa', a);

    const m = await browser.element('xpath', '//html/body/dialog/div/iframe');
    console.log('MMMMM', m);

    const l = await browser.getValue('//html/body/dialog/div/iframe');
    console.log('LLLL', l);

    const r = await browser.elementIdText(m.value.ELEMENT);
    console.log('rrrrrrrrR', r);

    // await browser.assert.visible('//html/body/dialog/div/iframe/html/body/dialog');

    await browser.frame(0);
    // results here are same as frame(0)
    // await browser.frame(m.value);

    await browser.pause(1000);
    await browser.waitForElementVisible('//html/body');
    const p = await browser.getValue('//html/body');
    console.log('PPP', p);

    await browser.waitForElementVisible('//html/body/dialog[2]/div/iframe');
    const v = await browser
      .element('xpath', '//html/body/dialog[2]/div/iframe');

    await browser.frame(v.value);
    // await browser.assert.titleContains('Minimal Dev Wallet - Worker');

    // url = https://chapi-demo-issuer.digitalbazaar.com/
    const x = await browser.url();
    console.log('XXXXXX', x);

    // await browser.assert.visible('//html/body/dialog/div/iframe');
    await browser.useCss();
    await browser.waitForElementVisible('#confirmButton');
    await browser.assert.visible('#confirmButton');
    await browser.click('#confirmButton');

    await browser.waitForElementVisible('#doneButton');
    await browser.click('#doneButton');

    await browser.pause(5000);
  });

  after(browser => browser.end());
});
