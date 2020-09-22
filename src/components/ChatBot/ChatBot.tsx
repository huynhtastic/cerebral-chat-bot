import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ViewProps,
} from 'react-native';

import styles from './styles';
import { ChatMessage, Message } from '../ChatMessage';

export const ChatBot: React.FC<ViewProps> = ({
  testID = 'chatBot',
  ...props
}): React.ReactElement => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const sendMessage = (): void => {
    const newMessage: Message = { sender: 'You', message };
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
  };

  return (
    <SafeAreaView {...props} style={styles.container} testID={testID}>
      <View style={styles.chatHeader}>
        <Image
          testID="botIcon"
          style={styles.botIcon}
          source={{ uri: 'https://i.redd.it/1y3vw360an031.png' }}
        />
        <Text testID="botName" style={styles.botName}>
          Cerebral Bot
        </Text>
      </View>
      <FlatList
        contentContainerStyle={styles.chatHistory}
        testID="chatHistory"
        renderItem={ChatMessage}
        data={chatHistory}
        ListEmptyComponent={renderEmptyList}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.chatFooter}>
        <TextInput
          value={message}
          testID="messageField"
          onChangeText={setMessage}
        />
        <Button
          disabled={message.length === 0}
          title="Send"
          onPress={sendMessage}
          testID="sendButton"
        />
      </View>
    </SafeAreaView>
  );
};

const renderEmptyList = (): React.ReactElement => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Your chat history will show here</Text>
    </View>
  );
};
