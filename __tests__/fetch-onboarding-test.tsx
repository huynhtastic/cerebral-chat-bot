import { act, render } from '@testing-library/react-native';
import fetchMock from 'fetch-mock';
import 'react-native';
import React from 'react';

import App from '../src/App';

const ENDPOINT =
  'https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json';

describe('when fetching onboarding', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  it('should show success after fake fetch', async () => {
    const mockResult = {
      status: 200,
      json: {
        text: 'success',
      },
    };
    fetchMock.get(ENDPOINT, mockResult);

    const { getByText } = render(<App />);
    await act(async () => {});

    expect(getByText(JSON.stringify(mockResult))).not.toBeNull();
  });

  it('should show error when failing fetch', async () => {
    const mockResult = { status: 404, json: { text: 'error' } };
    fetchMock.get(ENDPOINT, mockResult);

    const { getByText } = render(<App />);
    await act(async () => {});

    expect(getByText(JSON.stringify(mockResult))).not.toBeNull();
  });
});
