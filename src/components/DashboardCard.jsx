import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { fonts } from '../utils/fonts'

export default function DashboardCard({
  backgroundColor = 'red',
  image,
  title,
  value,
}) {
  const styles = StyleSheet.create({
    card: {
      borderRadius: 10,
      backgroundColor,
      padding: 15,
      elevation: 3,
      width: 170,
    },
    value: {
      marginTop: 20,
      fontSize: 24,
      fontFamily: fonts.Bold,
      color: 'white',
    },
    title: {
      fontSize: 16,
      fontFamily: fonts.SemiBold,
      color: 'white',
    },
  })

  return (
    <View style={styles.card}>
      {image}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
