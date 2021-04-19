import React from 'react'
import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';


import colors from '../styles/colors'
import wateringImg from '../assets/watering.png'

import {Button} from '../component/Button'



export function Welcome () {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {`\n`} 
                suas plantas{`\n`} 
                de forma fácil
            </Text>
            <Image source={wateringImg} />
            <Text style={styles.subTitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
sempre que precisar.</Text>
            
            <Button label={'Início'} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 30
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.heading,
        paddingHorizontal: 20,
        textAlign: 'center',
  },
  subTitle: {
      fontSize: 18,
      textAlign: 'center',
      color: colors.heading,
  },
  button: {
      alignItems: 'center',
      borderRadius: 16,
      color: colors.white,
      backgroundColor: colors.green,
      justifyContent: 'center',
      padding: 16

  }
});