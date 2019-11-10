import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
// import { Asset } from 'expo-asset'
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux';
import AppScreen from './components/AppScreen';

const { store, persistor } = configureStore();

const App = (/* { skipLoading } */) => {
  const [loading, setLoading] = useState(true);

  function startAsync() {
    return Promise.all([
      // Asset.loadAsync([
      //   require('./assets/images/robot-dev.png'),
      //   require('./assets/images/robot-prod.png'),
      // ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'avenir-next-bold': require('./assets/fonts/AvenirNext-Bold.ttf'),
        'avenir-next-demi-bold': require('./assets/fonts/AvenirNext-DemiBold.ttf'),
        'avenir-next-medium': require('./assets/fonts/AvenirNext-Medium.ttf'),
        'avenir-next-regular': require('./assets/fonts/AvenirNext-Regular.ttf'),
        'avenir-next-light': require('./assets/fonts/AvenirNext-UltraLight.ttf'),
      }),
    ]);
  }

  function onError(err) {
    return console.warn(err);
  }

  function onFinish() {
    return setLoading(false);
  }

  if (loading /* && !skipLoading */) {
    return (
      <AppLoading
        startAsync={startAsync}
        onError={onError}
        onFinish={onFinish}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <AppScreen />
        </PersistGate>
      </Provider>
    );
  }
};

export default App;
