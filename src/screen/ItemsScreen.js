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
        contentContainerStyle={{ gap: 5, margin: 10, paddingBottom: 20 }}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <Text style={styles.title}>Daftar Barang</Text>
            </View>
          </>
        }
      />
      <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
        <AntDesign name="pluscircle" size={50} color="red" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: 'black',
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
