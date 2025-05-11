import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import HomeScreen from './screens/HomeScreen';
import {app_id} from './keys';


export default function App(): React.JSX.Element {
    useEffect(() => {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize(app_id);
        OneSignal.Notifications.requestPermission(true);
    }, []);
  return (
      <SafeAreaView style={{ flex: 1 }}>
          <HomeScreen />
      </SafeAreaView>
  );
}

