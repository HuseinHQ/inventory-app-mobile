import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { fonts } from '../utils/fonts';
import noImage from '../assets/no_image.jpg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, putImage } from '../store/item/item.action';
import { useNavigation } from '@react-navigation/native';

export default function ItemCard({ item }) {
  const accessToken = useSelector(state => state.user.accessToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDelete = () => {
    Alert.alert(
      `Hapus ${item?.name}`,
      'Apakah Anda yakin ingin menghapus item ini?',
      [
        {
          text: 'Batal',
        },
        {
          text: 'Iya',
          onPress: () => {
            dispatch(
              deleteItem(item.id, accessToken, error => {
                Alert.alert(error);
              }),
            );
          },
        },
      ],
    );
  };

  const handleChangeImage = () => {
    dispatch(putImage(item?.id, accessToken));
  };
  const handleEdit = () => {
    navigation.navigate('edit', { item });
  };
  const goToDetailPage = () => {
    navigation.navigate('detail', { item });
  };

  return (
    <View style={styles.outer}>
      <TouchableOpacity style={styles.card} onPress={goToDetailPage}>
        <View style={styles.leftContent}>
          <TouchableOpacity onPress={handleChangeImage}>
            <Image
              source={item?.image ? { uri: item?.image } : noImage}
              resizeMode="cover"
              style={styles.image}
            />
          </TouchableOpacity>
          <View>
            <Text style={[styles.textBlack, styles.title]}>{item?.name}</Text>
            <Text style={[styles.textBlack, styles.quantity]}>
              Jumlah: {item?.quantity}
            </Text>
            <Text style={[styles.textBlack, styles.condition]}>
              Kategori: {item?.category}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleDelete} style={styles.button}>
            <MaterialCommunityIcons name="delete" size={30} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit} style={styles.button}>
            <Entypo name="edit" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
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
  },
  button: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
