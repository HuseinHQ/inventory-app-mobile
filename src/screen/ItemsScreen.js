import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import ItemCard from '../components/ItemCard'
import { fonts } from '../utils/fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

export default function ItemsScreen({ items }) {
  const navigation = useNavigation()

  const handleAddItem = () => {
    navigation.navigate('add')
  }

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
  )
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
})
