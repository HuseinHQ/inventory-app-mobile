import React, { useEffect, useState } from 'react'
import {
  Button,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SectionListComponent,
  Text,
  Alert,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts } from '../utils/fonts'
import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios'
import { BACKEND_URL } from '../../env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AddPage({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    quantity: 1,
    category: '',
    location: '',
    condition: '', // new or second
  })
  const [token, setToken] = useState('')

  const handleInputChange = (name, value) => {
    setForm(prevState => ({ ...prevState, [name]: value }))
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('access_token')
      if (value) {
        setToken(value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/items`, form, {
        headers: { 'Content-Type': 'application/json', access_token: token },
      })
      navigation.goBack()
    } catch (error) {
      console.log(error)
      Alert.alert(error.response.data.message)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Tambah Barang</Text>
      </View>

      <TextInput
        placeholderTextColor="black"
        style={styles.input}
        placeholder="Name"
        onChangeText={value => handleInputChange('name', value)}
        value={form.name}
      />
      <TextInput
        placeholderTextColor="black"
        style={styles.input}
        placeholder="Description"
        onChangeText={value => handleInputChange('description', value)}
        value={form.description}
      />
      <TextInput
        placeholderTextColor="black"
        style={styles.input}
        placeholder="Quantity"
        onChangeText={value => handleInputChange('quantity', value)}
        value={form.quantity.toString()}
        keyboardType="numeric"
      />
      <TextInput
        placeholderTextColor="black"
        style={styles.input}
        placeholder="Category"
        onChangeText={value => handleInputChange('category', value)}
        value={form.category}
      />
      <TextInput
        placeholderTextColor="black"
        style={styles.input}
        placeholder="Location"
        onChangeText={value => handleInputChange('location', value)}
        value={form.location}
      />
      <SelectDropdown
        data={[
          { value: 'new', show: 'baru' },
          { value: 'second', show: 'bekas' },
        ]}
        onSelect={selectedItem => {
          setForm(prev => ({
            ...prev,
            condition: selectedItem.value,
          }))
        }}
        renderButton={() => {
          return (
            <View
              style={{ ...styles.input, height: 45, justifyContent: 'center' }}>
              <Text style={styles.text}>
                {form.condition
                  ? form.condition === 'new'
                    ? 'baru'
                    : 'bekas'
                  : 'Kondisi barang'}
              </Text>
            </View>
          )
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View>
              <Text style={[styles.text, styles.textItem]}>{item.show}</Text>
            </View>
          )
        }}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontFamily: fonts.Bold,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
    fontFamily: fonts.Light,
    borderRadius: 10,
  },
  text: {
    color: 'black',
    fontFamily: fonts.Light,
  },
  textItem: {
    padding: 10,
  },
  submitButton: {
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontFamily: fonts.SemiBold,
  },
})
