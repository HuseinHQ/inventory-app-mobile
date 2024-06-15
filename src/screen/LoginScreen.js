import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { fonts } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/user/user.action';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state?.user?.accessToken);
  const error = useSelector(state => state?.user?.error);
  const [secureEntry, setSecureEntry] = useState(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSignup = () => {
    navigation.navigate('register');
  };

  const onChangeTextHandler = (value, name) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLoginHandler = () => {
    dispatch(login(form));
  };

  useEffect(() => {
    if (accessToken) navigation.reset({ index: 0, routes: [{ name: 'main' }] });
  }, [accessToken]);

  useEffect(() => {
    if (error) Alert.alert(error);
  }, [error]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Halo,</Text>
        <Text style={styles.headingText}>Selamat</Text>
        <Text style={styles.headingText}>Datang</Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}>
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
            placeholder="Enter your password"
            placeholderTextColor={'#000000'}
            secureTextEntry={secureEntry}
            value={form.password}
            onChangeText={value => onChangeTextHandler(value, 'password')}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry(prev => !prev);
            }}>
            {secureEntry ? (
              <Entypo name="eye-with-line" size={20} color="#000000" />
            ) : (
              <Entypo name="eye" size={20} color="#000000" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={onLoginHandler}
          style={styles.loginButtonWrapper}>
          <Text style={styles.loginText}>Masuk</Text>
        </TouchableOpacity>
        <View style={styles.textContainer2}>
          <Text style={styles.accountText}>Belum punya akun?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    color: '#000',
  },
  forgotPasswordText: {
    color: '#3498db',
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: '#007BFF',
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: '#FFFF',
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
});
