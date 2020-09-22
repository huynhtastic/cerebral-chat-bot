import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import 'react-native';

import { ChatBot } from '../src/components/ChatBot';

it('has all components', () => {
  const { getByTestId } = render(<ChatBot />);

  expect(getByTestId('botIcon')).not.toBeNull();
  expect(getByTestId('botName')).not.toBeNull();
  expect(getByTestId('chatHistory')).not.toBeNull();
  expect(getByTestId('messageField')).not.toBeNull();
  expect(getByTestId('sendButton')).not.toBeNull();
});

it('should show chat message after pressing send', async () => {
  const message = 'new message';
  const { getByTestId, getByText } = render(<ChatBot />);

  fireEvent.changeText(getByTestId('messageField'), message);
  fireEvent.press(getByTestId('sendButton'));

  expect(getByText(message)).not.toBeNull();
  expect(getByTestId('message-0')).not.toBeNull();
});
