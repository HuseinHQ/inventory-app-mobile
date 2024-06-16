import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import noImage from '../assets/no_image.jpg';
import { fonts } from '../utils/fonts';
import moment from 'moment';

export default function DetailPage({ route }) {
  const { item } = route.params;
  const { height, width } = Dimensions.get('screen');

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      margin: 20,
      gap: 10,
    },
    image: {
      width: width - 40,
      height: height / 4,
      resizeMode: 'contain',
      backgroundColor: 'white',
      elevation: 3,
      borderRadius: 10,
    },
    detailContainer: {
      width: '100%',
    },
    title: {
      fontFamily: fonts.SemiBold,
      fontSize: 24,
      marginBottom: 10,
      color: '#333',
    },
    paragraph: {
      fontFamily: fonts.Medium,
      fontSize: 16,
      marginBottom: 5,
      color: '#666',
    },
  });
  console.log(item);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {console.log(item.image)}
      <Image
        source={item?.image ? { uri: item.image } : noImage}
        style={styles.image}
      />

      <View style={styles.detailContainer}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.paragraph}>{item?.description}</Text>
        <Text style={styles.paragraph}>Category: {item?.category}</Text>
        <Text style={styles.paragraph}>Category: {item?.category}</Text>
        <Text style={styles.paragraph}>Jumlah: {item?.quantity}</Text>
        <Text style={styles.paragraph}>
          Kondisi: {item?.condition === 'new' ? 'Baru' : 'Bekas'}
        </Text>
        <Text style={styles.paragraph}>
          Lokasi Penyimpanan: {item?.location}
        </Text>
        <Text style={styles.paragraph}>
          Pertama kali ditambahkan:{' '}
          {moment(item?.createdAt).format('DD MMM YYYY')}
        </Text>
        <Text style={styles.paragraph}>
          Terakhir diedit: {moment(item?.updatedAt).format('DD MMM YYYY')}
        </Text>
      </View>
    </ScrollView>
  );
}
