import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screen/DashboardScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '../../env';
import ItemsScreen from '../screen/ItemsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Dashboard">
      <Tab.Screen name="Dashboard" children={() => <DashboardScreen />} />
      <Tab.Screen name="Items" children={() => <ItemsScreen />} />
      <Tab.Screen name="Logs" children={() => <ItemsScreen />} />
    </Tab.Navigator>
  );
}
