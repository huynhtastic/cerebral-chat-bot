import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { ChatBot, OnboardPath } from './components/ChatBot';
import { OnboardError } from './components/OnboardError';

import styles from './styles';

const ENDPOINT =
  'https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json';

const App = (): React.ReactElement => {
  const [onboardJson, setonboardJson] = useState<OnboardPath[] | null>(null);

  useEffect((): void => {
    const fetchOnboarding = async (): Promise<void> => {
      const res = await fetch(ENDPOINT);

      if (res.status !== 200) {
        setonboardJson([]);
      }

      setonboardJson(await res.json());
    };
    fetchOnboarding();
  }, []);

  const renderFetchResult = (): React.ReactElement => {
    if (onboardJson === null) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            testID="stillFetching"
            color="#000fff"
          />
        </SafeAreaView>
      );
    } else if (onboardJson.length === 0) {
      return <OnboardError />;
    } else {
      return <ChatBot onboardPaths={onboardJson} />;
    }
  };

  return renderFetchResult();
};

export default App;
