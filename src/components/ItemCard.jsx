import React, { useEffect, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { fonts } from '../utils/fonts'
import noImage from '../assets/no_image.jpg'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { BACKEND_URL } from '../../env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ItemCard({ item }) {
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
        console.log('Error', e)
        Alert.alert(JSON.stringify(e))
      }
    }

    checkAccessToken()
  }, [])

  const handleDelete = async () => {
    if (!accessToken) {
      Alert.alert('Invalid Token')
    }

    try {
      const { data } = await axios.delete(`${BACKEND_URL}/items/${item.id}`, {
        headers: {
          access_token: accessToken,
        },
      })
      console.log(data)
    } catch (error) {
      console.log(error)
      Alert.alert(error.response.data.message)
    }
  }
  const handleEdit = () => {}

  return (
    <View style={styles.outer}>
      <TouchableOpacity style={styles.card}>
        <View style={styles.leftContent}>
          <View>
            <Image
              source={item?.image ? { uri: item?.image } : noImage}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View>
            <Text style={[styles.textBlack, styles.title]}>{item?.name}</Text>
            <Text style={[styles.textBlack, styles.quantity]}>
              Jumlah: {item?.quantity}
            </Text>
            <Text style={[styles.textBlack, styles.condition]}>
              Kondisi: {item?.condition}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleDelete}>
            <MaterialCommunityIcons name="delete" size={30} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit}>
            <Entypo name="edit" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    margin: 5,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    gap: 20,
    elevation: 2,
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    gap: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textBlack: {
    color: 'black',
  },
  title: {
    fontFamily: fonts.SemiBold,
  },
  quantity: {
    fontFamily: fonts.Regular,
  },
  condition: {
    fontFamily: fonts.Regular,
  },
  buttonContainer: {
    justifyContent: 'center',
    gap: 20,
  },
})
