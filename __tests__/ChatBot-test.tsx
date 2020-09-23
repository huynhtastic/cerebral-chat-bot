import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import 'react-native';

import { ChatBot, OnboardPath } from '../src/components/ChatBot';

const mockPaths: OnboardPath[] = [
  { id: -1, question: 'question -1', validation: false },
  { id: 1, question: 'question 1', validation: true, paths: -1 },
];

describe('when component renders', () => {
  it('should have all components', () => {
    const { getByTestId } = render(<ChatBot onboardPaths={mockPaths} />);

    expect(getByTestId('botIcon')).not.toBeNull();
    expect(getByTestId('botName')).not.toBeNull();
    expect(getByTestId('chatHistory')).not.toBeNull();
    expect(getByTestId('messageField')).not.toBeNull();
    expect(getByTestId('sendButton')).not.toBeNull();
  });

  it("should show bot's 2nd question", (): void => {
    const { getByTestId, getByText } = render(
      <ChatBot onboardPaths={mockPaths} />,
    );

    const expectedText = mockPaths[1].question;
    expect(getByText(expectedText)).not.toBeNull();
    expect(getByTestId('message-0')).not.toBeNull();
  });
});

describe('when sending message', () => {
  it("should show user's sent message", async () => {
    const message = 'new message';
    const { getByTestId, getByText } = render(
      <ChatBot onboardPaths={mockPaths} />,
    );

    fireEvent.changeText(getByTestId('messageField'), message);
    fireEvent.press(getByTestId('sendButton'));

    expect(getByText(message)).not.toBeNull();
    expect(getByTestId('message-1')).not.toBeNull();
  });

  it("should show bot's new question", async () => {
    const message = 'new message';
    const { getByTestId, getByText } = render(
      <ChatBot onboardPaths={mockPaths} />,
    );

    fireEvent.changeText(getByTestId('messageField'), message);
    fireEvent.press(getByTestId('sendButton'));

    const expectedText = mockPaths[0].question;
    expect(getByText(expectedText)).not.toBeNull();
    expect(getByTestId('message-2')).not.toBeNull();
  });
});
