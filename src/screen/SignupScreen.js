import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { fonts } from '../utils/fonts'
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BACKEND_URL } from '../../env'
import axios from 'axios'

const SignupScreen = () => {
  const navigation = useNavigation()
  const [secureEntry, setSecureEntry] = useState([true, true])
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
  })

  const onChangeTextHandler = (value, name) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSignupHandler = async () => {
    try {
      console.log(form)
      const { data } = await axios.post(`${BACKEND_URL}/register`, form, {
        headers: { 'Content-Type': 'application/json' },
      })

      Alert.alert('Berhasil register', 'silakan login', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('login')
          },
        },
      ])
    } catch (error) {
      console.log(error)
      Alert.alert(error.response.data.message)
    }
  }

  const handleLogin = () => {
    navigation.navigate('login')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Ayo Kita</Text>
        <Text style={styles.headingText}>Mulai</Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Masukkan nama Anda"
            placeholderTextColor={'#000000'}
            keyboardType="email-address"
            value={form.name}
            onChangeText={value => onChangeTextHandler(value, 'name')}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Masukkan email Anda"
            placeholderTextColor={'#000000'}
            keyboardType="email-address"
            value={form.email}
            onChangeText={value => onChangeTextHandler(value, 'email')}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Masukkan password Anda"
            placeholderTextColor={'#000000'}
            secureTextEntry={secureEntry[0]}
            value={form.password}
            onChangeText={value => onChangeTextHandler(value, 'password')}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry(prev => [!prev[0], prev[1]])
            }}>
            {secureEntry[0] ? (
              <Entypo name="eye-with-line" size={20} color="#000000" />
            ) : (
              <Entypo name="eye" size={20} color="#000000" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Konfirmasi password"
            placeholderTextColor={'#000000'}
            secureTextEntry={secureEntry[1]}
            value={form.password_confirm}
            onChangeText={value =>
              onChangeTextHandler(value, 'password_confirm')
            }
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry(prev => [prev[0], !prev[1]])
            }}>
            {secureEntry[1] ? (
              <Entypo name="eye-with-line" size={20} color="#000000" />
            ) : (
              <Entypo name="eye" size={20} color="#000000" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButtonWrapper}>
          <Text onPress={onSignupHandler} style={styles.loginText}>
            Daftar
          </Text>
        </TouchableOpacity>
        <View style={styles.textContainer2}>
          <Text style={styles.accountText}>Sudah punya akun?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    padding: 20,
  },
  backButton: {
    width: '9%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textContainer: {
    marginVertical: 20,
  },
  textContainer2: {
    flexDirection: 'row',
    gap: 5,
  },
  headingText: {
    fontSize: 35,
    color: '#000000',
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 25,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10,
    marginTop: 20,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
    color: '#000000',
  },

  loginButtonWrapper: {
    backgroundColor: '#007BFF',
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  accountText: {
    color: '#007BFF',
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: '#007BFF',
    fontFamily: fonts.SemiBold,
  },
})
