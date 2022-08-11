/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {NativeBaseProvider, useColorModeValue} from 'native-base';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider as StoreProvider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import NavContainer from './src/navigation';
import {theme} from './src/theme';
import {ConfirmModalProvider} from './src/components/CofirmationModel';
import {persistor, store} from './src/redux/store';
import './src/localization';
import {AppContextProvider} from './src/Context';

// import './src/constants/IMLocalize';

// NOTE: hiding warning./s about color contrasts
LogBox.ignoreLogs(['NativeBase: The contrast ratio of']);
LogBox.ignoreAllLogs();

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <AppContextProvider>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            {/* <StatusBar */}
            {/* // barStyle={useColorModeValue('dark-content','light-content', )} */}
            {/* /> */}
            <SafeAreaProvider>
              <NativeBaseProvider theme={theme}>
                <ConfirmModalProvider>
                  {/* <StatusBar translucent backgroundColor="transparent" /> */}
                  <NavContainer />
                </ConfirmModalProvider>
              </NativeBaseProvider>
            </SafeAreaProvider>
          </QueryClientProvider>
        </PersistGate>
        <FlashMessage
          position="top"
          statusBarHeight={StatusBar.currentHeight}
        />
      </StoreProvider>
    </AppContextProvider>
  );
}

export default App;
