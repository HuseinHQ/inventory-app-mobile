import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ItemCard from '../components/ItemCard';
import { fonts } from '../utils/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../store/item/item.action';

export default function ItemsScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.accessToken);
  const items = useSelector(state => state.item.items);

  const handleAddItem = () => {
    navigation.navigate('add');
  };

  useEffect(() => {
    if (accessToken) dispatch(getItems(accessToken));
  }, [dispatch]);

  return (
    <>
      <FlatList
        data={items}
        renderItem={({ item }) => <ItemCard item={item} key={item.id} />}
        contentContainerStyle={styles.flatlist}
        ListHeaderComponent={
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Daftar Barang</Text>
            </View>
          </>
        }
      />
      <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
        <AntDesign name="plus" size={16} color="white" />
        <Text style={styles.text}>Tambah Barang</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  flatlist: {
    gap: 5,
    margin: 10,
    paddingBottom: 60,
  },
  title: {
    color: 'black',
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E34F6A',
    elevation: 2,
    padding: 10,
    borderRadius: 100,
    gap: 5,
  },
  text: {
    color: 'white',
    fontFamily: fonts.SemiBold,
  },
});
