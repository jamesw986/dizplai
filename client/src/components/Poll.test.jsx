import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Poll from './Poll';
import useGetActivePoll from '../hooks/useGetActivePoll';

vi.mock('../hooks/useGetActivePoll.js');

describe('Poll component', () => {
  test('should display a loading message when poll data is still loading', async () => {
    vi.mocked(useGetActivePoll).mockReturnValue({
      isPending: true,
    });

    render(<Poll />);

    const loadingMessage = await screen.findByText('Loading poll...');
    expect(loadingMessage).toBeVisible();
  });

  test('should display an error message when poll data fails to load', async () => {
    vi.mocked(useGetActivePoll).mockReturnValue({
      isError: true,
      error: {
        message: 'error message',
      },
    });

    render(<Poll />);

    const errorMessage = await screen.findByText(
      'Error loading poll: error message',
    );
    expect(errorMessage).toBeVisible();
  });
});
