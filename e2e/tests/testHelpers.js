import axios from 'axios';
import { expect } from '@playwright/test';

export async function loadPoll() {
  const poll = {
    question: 'Who has won the most premier leagues?',
    votingOptions: [
      {
        option: 'Manchester City',
      },
      {
        option: 'Chelsea',
      },
      {
        option: 'Manchester United',
      },
      {
        option: 'Arsenal',
      },
      {
        option: 'Liverpool',
      },
    ],
  };

  await axios.post('http://localhost:5000/polls', poll);

  return poll;
}

export async function assertPollRendersCorrectly(poll, page) {
  const { question, votingOptions } = poll;

  await expect(page.getByText(question)).toBeVisible();

  for (const votingOption of votingOptions) {
    const option = votingOption.option;

    await expect(page.getByText(option)).toBeVisible();
  }
}
