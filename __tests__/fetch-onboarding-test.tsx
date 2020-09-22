import { act, render } from '@testing-library/react-native';
import fetchMock, { MockResponse } from 'fetch-mock';
import 'react-native';
import React from 'react';

import App from '../src/App';
import { OnboardPath } from '../src/components/ChatBot';

const ENDPOINT =
  'https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json';

const mockPaths: OnboardPath[] = [
  { id: -1, question: 'question -1', validation: false },
  { id: 1, question: 'question 1', validation: true, paths: -1 },
];

describe('when fetching onboarding', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  it('should show chatBot after fake fetch', async () => {
    const mockResult: MockResponse = {
      status: 200,
      body: mockPaths,
    };
    fetchMock.get(ENDPOINT, mockResult);

    const { getByTestId } = render(<App />);
    await act(async () => {});

    expect(getByTestId('chatBot')).not.toBeNull();
  });

  it('should show onboardError when failing fetch', async () => {
    fetchMock.get(ENDPOINT, 404);

    const { getByTestId } = render(<App />);
    await act(async () => {});

    expect(getByTestId('onboardError')).not.toBeNull();
  });

  it('should show activity indicator while fetching', async () => {
    const mockResult = { status: 404, body: [] };
    fetchMock.get(ENDPOINT, mockResult);

    const { getByTestId } = render(<App />);
    expect(getByTestId('stillFetching')).not.toBeNull();
    await act(async () => {});
  });
});
