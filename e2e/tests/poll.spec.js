import { test, expect } from '@playwright/test';
import { assertPollRendersCorrectly, loadPoll } from './testHelpers';

test('User can vote on an option and see the current poll results', async ({
  page,
}) => {
  const poll = await loadPoll();

  await page.goto('http://localhost:5173/');

  await expect(page).toHaveTitle(/Dizplai/);

  await assertPollRendersCorrectly(poll, page);

  const option = poll.votingOptions[0].option;
  await page.getByText(option).click();
  await page.getByText('Submit').click();

  const thankYouMessage = 'Thank you for your response';
  await expect(page.getByText(thankYouMessage)).toBeVisible();

  const chosenOption = page
    .getByTestId('voteOption')
    .filter({ hasText: option });
  const chosenOptionPercentage = chosenOption.getByText('100%');

  expect(chosenOption).toBeVisible();
  expect(chosenOptionPercentage).toBeVisible();
});
