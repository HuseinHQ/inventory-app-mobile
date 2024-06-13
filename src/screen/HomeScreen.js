import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fonts } from '../utils/fonts'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleLogin = () => {
    navigation.navigate('login')
  }

  const handleSignup = () => {
    navigation.navigate('register')
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Image source={require('../assets/Home.png')} style={styles.bannerhome} />
      <Text style={styles.title}>INVENTARIS MOBILE</Text>
      <Text style={styles.subtitle}>
        Kelola Inventarismu Dengan Mudah, dan Cepat di Genggaman Tanganmu!
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.loginButtonWrapper, { backgroundColor: '#007BFF' }]}
          onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper]}
          onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    alignItems: 'center',
  },
  logo: {
    height: 75,
    width: 80,
    marginVertical: 30,
  },
  bannerhome: {
    marginTop: -10,
    marginVertical: 20,
    height: 350,
    width: 260,
  },
  title: {
    fontSize: 33,
    fontFamily: fonts.SemiBold,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: fonts.Medium,
    color: '#000',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#007BFF',
    width: '80%',
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 98,
  },
  loginButtonText: {
    color: '#FFFF',
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  signupButtonText: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    color: '#007BFF',
  },
})
