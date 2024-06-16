import React, { useEffect, useState } from 'react';
import {
  Button,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SectionListComponent,
  Text,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { postItem, putItem } from '../store/item/item.action';

export default function EditPage({ navigation, route }) {
  const { item } = route.params;
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.accessToken);

  const [form, setForm] = useState({
    name: item?.name,
    description: item?.description,
    quantity: +item?.quantity,
    category: item?.category,
    location: item?.location,
    condition: item?.condition, // new or second
  });
  const [isFocused, setIsFocused] = useState({
    name: false,
    description: false,
    quantity: false,
    category: false,
    location: false,
    condition: false,
  });

  const handleInputChange = (name, value) => {
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(
      putItem(
        { id: item.id, form, access_token: accessToken },
        {
          successCallback: message => {
            Alert.alert('Success', message, [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
          errorCallback: message => Alert.alert(message),
        },
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Barang</Text>
      </View>

      <TextInput
        placeholderTextColor="black"
        placeholder="Name"
        onChangeText={value => handleInputChange('name', value)}
        value={form.name}
        style={[styles.input, isFocused.name && styles.inputFocused]}
        onFocus={() => setIsFocused({ ...isFocused, name: true })}
        onBlur={() => setIsFocused({ ...isFocused, name: false })}
      />
      <TextInput
        placeholderTextColor="black"
        placeholder="Description"
        onChangeText={value => handleInputChange('description', value)}
        value={form.description}
        multiline={true}
        style={[styles.input, isFocused.description && styles.inputFocused]}
        onFocus={() => setIsFocused({ ...isFocused, description: true })}
        onBlur={() => setIsFocused({ ...isFocused, description: false })}
      />
      <TextInput
        placeholderTextColor="black"
        placeholder="Quantity"
        onChangeText={value => handleInputChange('quantity', value)}
        value={form.quantity.toString()}
        keyboardType="numeric"
        style={[styles.input, isFocused.quantity && styles.inputFocused]}
        onFocus={() => setIsFocused({ ...isFocused, quantity: true })}
        onBlur={() => setIsFocused({ ...isFocused, quantity: false })}
      />
      <TextInput
        placeholderTextColor="black"
        placeholder="Category"
        onChangeText={value => handleInputChange('category', value)}
        value={form.category}
        style={[styles.input, isFocused.category && styles.inputFocused]}
        onFocus={() => setIsFocused({ ...isFocused, category: true })}
        onBlur={() => setIsFocused({ ...isFocused, category: false })}
      />
      <TextInput
        placeholderTextColor="black"
        placeholder="Location"
        onChangeText={value => handleInputChange('location', value)}
        value={form.location}
        style={[styles.input, isFocused.location && styles.inputFocused]}
        onFocus={() => setIsFocused({ ...isFocused, location: true })}
        onBlur={() => setIsFocused({ ...isFocused, location: false })}
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
          }));
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
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View>
              <Text style={[styles.text, styles.textItem]}>{item.show}</Text>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
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
    paddingVertical: 10,
  },
  inputFocused: {
    borderColor: '#007BFF',
    borderWidth: 2,
    outlineStyle: 'solid',
    paddingVertical: 9,
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
});
