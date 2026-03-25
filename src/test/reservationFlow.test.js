describe('Flujo de reservas', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('usuario hace login y reserva habitación', async () => {
    await element(by.id('loginEmail')).typeText('test@test.com');
    await element(by.id('loginPassword')).typeText('123456');
    await element(by.id('loginButton')).tap();

    await element(by.text('Reservas')).tap();
    await element(by.text('Suite Romántica')).tap();
    await element(by.id('inputName')).typeText('Juan');
    await element(by.id('inputPhone')).typeText('0999999999');
    await element(by.id('inputDate')).typeText('2026-03-18');
    await element(by.id('inputDuration')).typeText('2');
    await element(by.text('Confirmar Reserva')).tap();

    await expect(element(by.text('✅ Reserva confirmada'))).toBeVisible();
  });
});
