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

  const isBotMessage = index % 2 === 0;
  const senderColor = isBotMessage ? '#42a5f5' : '#ec407a';
  const bodyColor = isBotMessage ? '#1e88e5' : '#d81b60';
  return (
    <View style={styles.container} key={key} testID={key}>
      <Text
        style={{ ...styles.sender, color: senderColor }}
        testID={`sender-${index}`}>
        {sender}:
      </Text>
      <Text style={{ color: bodyColor }} testID={`message-${index}`}>
        {body}
      </Text>
    </View>
  );
};
