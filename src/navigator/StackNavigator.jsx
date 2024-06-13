import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from '../screen/HomeScreen.js'
import SignupScreen from '../screen/SignupScreen.js'
import SplashScreen from '../screen/splashscreen.js'
import LoginScreen from '../screen/LoginScreen.js'
import TabNavigator from './TabNavigator.jsx'
import AddPage from '../screen/AddPage.jsx'

const Stack = createNativeStackNavigator()

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={SignupScreen} />
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="main" component={TabNavigator} />
        <Stack.Screen name="add" component={AddPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
