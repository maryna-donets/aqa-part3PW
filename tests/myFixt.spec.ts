import {test, expect} from './fixtures/fixture';



test('C1: Garage page is opened', async ({garagePage}) => {
    await garagePage.getByRole('button', { name: 'Add car' }).click();
    await expect(garagePage.getByRole('button', { name: 'Add' })).toBeDisabled();
});