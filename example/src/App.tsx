import './config/unistyles';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/root.navigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatelessDialogProvider } from '@react-stateless-dialog/core';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ViewStyle } from 'react-native';
import { statelessDialogConfig } from './config/react-stateless-dialog';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { MobilyFlowService } from './services/mobilyflow-service';
import { useMobilyflowStore } from './stores/mobilyflow-store';
import { queryClient } from './config/query-client';

const SAFE_AREA: ViewStyle = { flex: 1, backgroundColor: 'black' };
const FLEX: ViewStyle = { flex: 1 };

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        MobilyFlowService.init();
        await MobilyFlowService.login();
        useMobilyflowStore.setState({ isLoading: false, error: null });
      } catch (error) {
        useMobilyflowStore.setState({ isLoading: false, error });
      }
    })();

    return () => {
      MobilyFlowService.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={SAFE_AREA}>
          <GestureHandlerRootView style={FLEX}>
            <NavigationContainer>
              <StatelessDialogProvider config={statelessDialogConfig}>
                <RootNavigator />
              </StatelessDialogProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
