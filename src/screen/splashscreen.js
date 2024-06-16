import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import splashscreenImg from '../assets/Logo.png';
import { useSelector } from 'react-redux';

const SplashScreen = ({ navigation }) => {
  const accessToken = useSelector(state => state.user.accessToken);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (accessToken) {
        navigation.reset({ index: 0, routes: [{ name: 'main' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'home' }] });
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={splashscreenImg} style={styles.splashImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
