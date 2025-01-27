import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DisplayPoll from './DisplayPoll';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const defaultQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe('DisplayPoll component', () => {
  const pollData = {
    question: 'poll question',
    votingOptions: [
      {
        option: 'option 1',
        votes: 0,
      },
    ],
  };

  const setVoted = vi.fn();

  test('should render the poll question', async () => {
    render(
      <QueryClientProvider client={defaultQueryClient}>
        <DisplayPoll pollData={pollData} setVoted={setVoted} />
      </QueryClientProvider>,
    );

    const pollQuestion = await screen.findByText(pollData.question);
    expect(pollQuestion).toBeVisible();
  });

  test('should render the poll options', async () => {
    render(
      <QueryClientProvider client={defaultQueryClient}>
        <DisplayPoll pollData={pollData} setVoted={setVoted} />
      </QueryClientProvider>,
    );

    const expectedPollOption = pollData.votingOptions[0].option;

    const pollQuestion = await screen.findByRole('button', {
      name: expectedPollOption,
    });
    expect(pollQuestion).toBeVisible();
  });

  test('should render a submit button', async () => {
    render(
      <QueryClientProvider client={defaultQueryClient}>
        <DisplayPoll pollData={pollData} setVoted={setVoted} />
      </QueryClientProvider>,
    );

    const submitButton = await screen.findByRole('button', {
      name: 'Submit',
    });
    expect(submitButton).toBeVisible();
  });

  test('the submit button should be disabled when no option is selected', async () => {
    render(
      <QueryClientProvider client={defaultQueryClient}>
        <DisplayPoll pollData={pollData} setVoted={setVoted} />
      </QueryClientProvider>,
    );

    const submitButton = await screen.findByRole('button', {
      name: 'Submit',
    });
    expect(submitButton).toBeDisabled();
  });

  test('the submit button should be enabled when an option is selected', async () => {
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={defaultQueryClient}>
        <DisplayPoll pollData={pollData} setVoted={setVoted} />
      </QueryClientProvider>,
    );

    const submitButton = await screen.findByRole('button', {
      name: 'Submit',
    });
    expect(submitButton).toBeDisabled();

    const votingOption = screen.getByText('option 1');
    await user.click(votingOption);

    expect(submitButton).toBeEnabled();
  });
});
