import React, { useEffect, useRef, useState } from 'react';
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
import { OnboardError } from '../OnboardError';
import { findPathIndexById, validateAnswer } from './utils';

export interface OnboardPath {
  id: number;
  question: string;
  validation: boolean | string[] | string;
  paths?: number | Record<string, number>;
}

type Props = ViewProps & {
  onboardPaths: OnboardPath[];
};

export const ChatBot: React.FC<Props> = ({
  onboardPaths,
  testID = 'chatBot',
  ...props
}): React.ReactElement => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [currentPathIndex, setCurrentPathIndex] = useState(-2);
  const [isSessionTerminated, setIsSessionTerminated] = useState(false);

  const chatHistoryRef = useRef<FlatList>(null);

  const addExchange = (botText: string): void => {
    const userMessage: Message = { sender: 'You', body: message };
    const botMessage: Message = { sender: 'Cerebral', body: botText };
    setChatHistory([...chatHistory, userMessage, botMessage]);
  };

  const sendMessage = (): void => {
    const { question, paths, validation } = onboardPaths[currentPathIndex];
    const loweredMessage = message.toLowerCase();
    const isAnswerValid = validateAnswer(validation, loweredMessage);

    if (isAnswerValid) {
      if (typeof paths === 'object') {
        const nextPathIndex = findPathIndexById(
          paths[loweredMessage],
          onboardPaths,
        );
        addExchange(onboardPaths[nextPathIndex].question);
        setCurrentPathIndex(nextPathIndex);
      } else if (typeof paths === 'number') {
        const nextPathIndex = findPathIndexById(paths, onboardPaths);
        addExchange(onboardPaths[nextPathIndex].question);
        setCurrentPathIndex(nextPathIndex);
      } else {
        addExchange(onboardPaths[0].question);
        setCurrentPathIndex(0);
      }
    } else {
      addExchange("I didn't get that. " + question);
    }

    setMessage('');
  };

  useEffect((): void => {
    const areTherePaths = onboardPaths.length !== 0;
    if (areTherePaths && currentPathIndex !== -2) {
      const isCurrentPathTerminating =
        onboardPaths[currentPathIndex].paths === undefined;
      if (isCurrentPathTerminating) {
        setMessage('This session has closed.');
        setIsSessionTerminated(true);
      }
    }
  }, [currentPathIndex, onboardPaths]);

  useEffect((): void => {
    const areTherePaths = onboardPaths.length !== 0;
    if (areTherePaths) {
      const newMessage: Message = {
        sender: 'Cerebral',
        body: onboardPaths[1].question,
      };
      setChatHistory([newMessage]);
      setCurrentPathIndex(1);
    }
  }, [onboardPaths]);

  if (onboardPaths.length === 0) {
    return <OnboardError />;
  }

  return (
    <SafeAreaView {...props} style={styles.container} testID={testID}>
      <View style={styles.chatHeader}>
        <Image
          testID="botIcon"
          style={styles.botIcon}
          source={{ uri: 'https://i.redd.it/1y3vw360an031.png' }}
        />
        <Text testID="botName" style={styles.botName}>
          Cerebral
        </Text>
      </View>
      <FlatList
        ref={chatHistoryRef}
        contentContainerStyle={styles.chatHistory}
        testID="chatHistory"
        renderItem={ChatMessage}
        data={chatHistory}
        ListEmptyComponent={renderEmptyList}
        keyExtractor={(_, index) => index.toString()}
        onContentSizeChange={() =>
          chatHistoryRef.current?.scrollToEnd({ animated: true })
        }
      />
      <View style={styles.chatFooter}>
        <TextInput
          editable={!isSessionTerminated}
          value={message}
          testID="messageField"
          style={styles.messageField}
          onChangeText={setMessage}
          placeholder="Reply here..."
        />
        <Button
          disabled={message.length === 0 || isSessionTerminated}
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
