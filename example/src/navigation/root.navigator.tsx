import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home-screen/home-screen';
import { OneTimeScreen } from '../screens/one-time-screen/one-time-screen';
import { SubscriptionsScreen } from '../screens/subscriptions-screen/subscriptions-screen';
import { EntitlementsScreen } from '../screens/entitlements-screen/entitlements-screen';
import { MaterialDesignIcons as Icon } from '@react-native-vector-icons/material-design-icons';

const Tab = createBottomTabNavigator();

const tabBarIconFactory = (iconName: string) => {
  return ({ color, size }: { focused: boolean; color: string; size: number }) => {
    return <Icon name={iconName as any} size={size} color={color} />;
  };
};

export const RootNavigator = () => {
  return (
    <Tab.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: tabBarIconFactory('home') }} />
      <Tab.Screen
        name="One-Time"
        component={OneTimeScreen}
        options={{ tabBarIcon: tabBarIconFactory('credit-card') }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{ tabBarIcon: tabBarIconFactory('autorenew') }}
      />
      <Tab.Screen
        name="Entitlements"
        component={EntitlementsScreen}
        options={{ tabBarIcon: tabBarIconFactory('account') }}
      />
    </Tab.Navigator>
  );
};
