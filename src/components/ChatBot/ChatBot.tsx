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

interface ChatMessage {
  sender: string;
  message: string;
}

export const ChatBot: React.FC<ViewProps> = ({
  testID = 'chatBot',
  ...props
}): React.ReactElement => {
  const [chatHistory] = useState<ChatMessage[]>([]);
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
        testID="chatHistory"
        renderItem={() => <View />}
        data={chatHistory}
      />
      <View style={styles.chatFooter}>
        <TextInput testID="messageField" />
        <Button title="Send" onPress={() => {}} testID="sendButton" />
      </View>
    </SafeAreaView>
  );
};
