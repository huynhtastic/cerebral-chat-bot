import React from 'react';
import { Text, View, ViewProps } from 'react-native';

import styles from './styles';

export const OnboardError: React.FC<ViewProps> = ({
  testID = 'onboardError',
  ...props
}): React.ReactElement => {
  return (
    <View style={styles.container} testID={testID} {...props}>
      <Text>An error has occurred. Please try reopening the application.</Text>
    </View>
  );
};
