import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screen/DashboardScreen';
import ItemsScreen from '../screen/ItemsScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Dashboard">
      <Tab.Screen
        name="Dashboard"
        children={() => <DashboardScreen />}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="space-dashboard"
              size={20}
              color={focused ? 'blue' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Items"
        children={() => <ItemsScreen />}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="box"
              size={20}
              color={focused ? 'blue' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
