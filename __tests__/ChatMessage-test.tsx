import { render } from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import { ListRenderItemInfo } from 'react-native';

import { ChatMessage, Message } from '../src/components/ChatMessage';

const mockMessage: Message = {
  sender: 'sender',
  message: 'message',
};

const mockSepators: ListRenderItemInfo<Message>['separators'] = {
  highlight: () => {},
  unhighlight: () => {},
  updateProps: () => {},
};

it('has all components', () => {
  const { getByTestId } = render(
    <ChatMessage index={0} item={mockMessage} separators={mockSepators} />,
  );

  expect(getByTestId('sender-0')).not.toBeNull();
  expect(getByTestId('message-0')).not.toBeNull();
});
