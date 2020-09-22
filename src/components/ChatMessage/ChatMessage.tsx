import React from 'react';
import { ListRenderItem, Text, View } from 'react-native';
import styles from './styles';

export interface Message {
  sender: string;
  body: string;
}

export const ChatMessage: ListRenderItem<Message> = ({
  item,
  index,
}): React.ReactElement => {
  const { sender, body } = item;

  const key = `chat-message-${index}`;
  return (
    <View style={styles.container} key={key} testID={key}>
      <Text testID={`sender-${index}`}>{sender}:</Text>
      <Text testID={`message-${index}`}>{body}</Text>
    </View>
  );
};
