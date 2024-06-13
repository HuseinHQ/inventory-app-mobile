import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardScreen from '../screen/DashboardScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import axios from 'axios'
import { BACKEND_URL } from '../../env'
import ItemsScreen from '../screen/ItemsScreen'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [accessToken, setAccessToken] = useState()

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const value = await AsyncStorage.getItem('access_token')
        if (value !== null) {
          // value previously stored
          setAccessToken(value)
        }
      } catch (e) {
        console.log(e)
        Alert.alert(JSON.stringify(e))
      }
    }

    checkAccessToken()
  }, [])

  useEffect(() => {
    const fetchItems = async access_token => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/items`, {
          headers: { access_token },
        })
        setItems(data.data)
      } catch (error) {
        console.log(error)
        Alert.alert(error.response.data.message)
      }
    }

    const fetchCategories = async access_token => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/categories`, {
          headers: { access_token },
        })
        setCategories(data.data)
      } catch (error) {
        console.log(error)
        Alert.alert(error.response.data.message)
      }
    }

    const fetchUser = async access_token => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/user`, {
          headers: { access_token },
        })
        setItems(data.data)
      } catch (error) {
        console.log(error)
        Alert.alert(error.response.data.message)
      }
    }

    if (accessToken) {
      fetchItems(accessToken)
      fetchCategories(accessToken)
      fetchUser(accessToken)
    }
  }, [accessToken])

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Dashboard">
      <Tab.Screen
        name="Dashboard"
        children={() => (
          <DashboardScreen categories={categories} items={items} />
        )}
      />
      <Tab.Screen name="Items" children={() => <ItemsScreen items={items} />} />
      <Tab.Screen name="Logs" children={() => <ItemsScreen items={items} />} />
    </Tab.Navigator>
  )
}
