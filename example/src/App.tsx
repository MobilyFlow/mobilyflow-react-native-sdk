import './config/unistyles';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/root.navigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatelessDialogProvider } from '@react-stateless-dialog/core';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ViewStyle } from 'react-native';
import { statelessDialogConfig } from './config/react-stateless-dialog';

const FLEX: ViewStyle = { flex: 1 };

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={FLEX}>
        <GestureHandlerRootView style={FLEX}>
          <NavigationContainer>
            <StatelessDialogProvider config={statelessDialogConfig}>
              <RootNavigator />
            </StatelessDialogProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
