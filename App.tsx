/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import TrackingProvider from './src/contexts/trackingProvider';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#ffed24" />
      <NavigationContainer>
        <TrackingProvider>
          <Routes />
        </TrackingProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
