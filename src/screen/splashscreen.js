import React, { useEffect } from 'react'
import { View, Image, StyleSheet, Alert } from 'react-native'
import { StackActions } from '@react-navigation/native'
import splashscreenImg from '../assets/splashscreen.png'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    let timer = null

    const checkAccessToken = async () => {
      try {
        const value = await AsyncStorage.getItem('access_token')
        timer = setTimeout(() => {
          if (value !== null) {
            // value previously stored
            navigation.reset({ index: 0, routes: [{ name: 'main' }] })
          } else {
            // No access_token stored
            navigation.reset({ index: 0, routes: [{ name: 'home' }] })
          }
        }, 2000)
      } catch (e) {
        console.log(e)
        Alert.alert(JSON.stringify(e))
      }
    }

    checkAccessToken()

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [])

  return (
    <View style={styles.container}>
      <Image source={splashscreenImg} style={styles.splashImage} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
