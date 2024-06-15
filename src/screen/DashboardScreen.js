import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from '../utils/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DashboardCard from '../components/DashboardCard';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getItems } from '../store/item/item.action';
import { getUser, logout } from '../store/user/user.action';

const DashboardScreen = ({ items, categories }) => {
  // hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // selector
  const accessToken = useSelector(state => state.user.accessToken);
  const dashboardData = useSelector(state => state.item.dashboard);
  const name = useSelector(state => state.user.name);

  // useEffect
  useEffect(() => {
    dispatch(getItems(accessToken));
    dispatch(getCategories(accessToken));
    dispatch(getUser(accessToken));
  }, [dispatch]);

  // function
  const handleLogout = () => {
    Alert.alert('Anda yakin ingin keluar?', 'Anda tidak bisa kembali', [
      { text: 'Tidak' },
      {
        text: 'Iya',
        onPress: () => {
          dispatch(
            logout(() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'home' }],
              }),
            ),
          );
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.split('')[0]}</Text>
          </View>
          <View>
            <Text style={styles.profileName}>Selamat datang,</Text>
            <Text style={styles.profileRole}>{name}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" style={styles.logout} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.cardContainer}>
          <DashboardCard
            backgroundColor="#E34F6A"
            title="Jenis Barang"
            value={dashboardData?.itemKind ?? 'N/A'}
            image={<MaterialIcons name="inventory" size={30} color="white" />}
          />
          <DashboardCard
            backgroundColor="#E6677B"
            title="Total Kategori"
            value={dashboardData?.totalCategory ?? 'N/A'}
            image={<MaterialIcons name="category" size={30} color="white" />}
          />
          <DashboardCard
            backgroundColor="#717ED4"
            title="Jumlah Seluruh Barang"
            value={dashboardData?.allItemCount ?? 'N/A'}
            image={
              <FontAwesome name="shopping-basket" size={30} color="white" />
            }
          />
          <DashboardCard
            backgroundColor="#525AC2"
            title="Barang Masuk Hari Ini"
            value={dashboardData?.incomingGoodsToday ?? 'N/A'}
            image={<FontAwesome name="truck" size={30} color="white" />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    backgroundColor: '#007BFF',
    width: 50,
    height: 50,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    color: 'white',
    fontFamily: fonts.SemiBold,
  },
  profileName: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.Medium,
  },
  profileRole: {
    color: 'white',
    fontSize: 12,
    fontFamily: fonts.Regular,
  },
  logout: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default DashboardScreen;
