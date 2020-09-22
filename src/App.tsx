import React, { useEffect, useState } from 'react';
import {
  // SafeAreaView,
  // StyleSheet,
  // ScrollView,
  // View,
  Text,
  // StatusBar,
} from 'react-native';

type OnboardJson = Record<string, any> | null;

const ENDPOINT =
  'https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json';

const App = (): React.ReactElement => {
  const [onboardJson, setonboardJson] = useState<OnboardJson>(null);

  useEffect((): void => {
    const fetchOnboarding = async (): Promise<void> => {
      const res = await fetch(ENDPOINT);

      if (res.status !== 200) {
        setonboardJson({});
      }

      setonboardJson(await res.json());
    };
    fetchOnboarding();
  }, []);

  const renderFetchResponse = (): React.ReactElement => {
    if (onboardJson === null) {
      return <Text>Loading...</Text>;
    } else if (Object.keys(onboardJson).length === 0) {
      return <Text>error</Text>;
    } else {
      return <Text>{JSON.stringify(onboardJson)}</Text>;
    }
  };

  return <>{renderFetchResponse()}</>;
};

export default App;
