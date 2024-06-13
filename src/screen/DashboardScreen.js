import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fonts } from '../utils/fonts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DashboardCard from '../components/DashboardCard'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const DashboardScreen = ({ items, categories }) => {
  const navigation = useNavigation()

  const handleLogout = () => {
    try {
      Alert.alert('Anda yakin ingin keluar?', 'Anda tidak bisa kembali', [
        { text: 'Tidak' },
        {
          text: 'Iya',
          onPress: async () => {
            await AsyncStorage.removeItem('access_token')
            navigation.reset({
              index: 0,
              routes: [{ name: 'home' }],
            })
          },
        },
      ])
    } catch (e) {
      console.log(e)
      Alert.alert(JSON.stringify(e))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View>
            <Text style={styles.profileName}>Selamat datang,</Text>
            <Text style={styles.profileRole}>{'TODO'}</Text>
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
            value={items?.length ?? 'N/A'}
            image={<MaterialIcons name="inventory" size={30} color="white" />}
          />
          <DashboardCard
            backgroundColor="#E6677B"
            title="Total Kategori"
            value={categories?.length ?? 'N/A'}
            image={<MaterialIcons name="category" size={30} color="white" />}
          />
          <DashboardCard
            backgroundColor="#717ED4"
            title="Jumlah Seluruh Barang"
            value={
              Array.isArray(items)
                ? items?.reduce(
                    (currentValue, item) => currentValue + item.quantity,
                    0,
                  )
                : 'N/A'
            }
            image={
              <FontAwesome name="shopping-basket" size={30} color="white" />
            }
          />
          <DashboardCard
            backgroundColor="#525AC2"
            title="Barang Masuk Hari Ini"
            value={
              Array.isArray(items)
                ? items?.reduce(
                    (currentValue, item) =>
                      currentValue +
                      (moment(item.createdAt).format('YYYY-MM-DD') ===
                      moment().format('YYYY-MM-DD')
                        ? 1
                        : 0),
                    0,
                  )
                : 'N/A'
            }
            image={<FontAwesome name="truck" size={30} color="white" />}
          />
        </View>
      </View>
    </View>
  )
}

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
})

export default DashboardScreen
