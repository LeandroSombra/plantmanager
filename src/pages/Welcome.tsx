import React from 'react'
import { SafeAreaView, Text, StyleSheet, Image, Dimensions, View } from 'react-native'
import {useNavigation} from '@react-navigation/core'


import colors from '../styles/colors'
import wateringImg from '../assets/watering.png'

import { Button } from '../component/Button'
import fonts from '../styles/fonts'



export function Welcome () {
    const navigation = useNavigation()

    function hanldeStart () {
        navigation.navigate('UserIdentification')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {`\n`} 
                    suas plantas{`\n`} 
                    de forma fácil
                </Text>
                <Image
                    source={wateringImg}
                    style={styles.image}  
                    resizeMode="contain"/>
                <Text style={styles.subTitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
    sempre que precisar.</Text>
                <Button label={'Início'} onPress={hanldeStart}  />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        color: colors.heading,
        fontFamily: fonts.heading,
        fontSize: 32,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        textAlign: 'center',
  },
  subTitle: {
      color: colors.heading,
      fontFamily: fonts.text,
      fontSize: 18,
      textAlign: 'center',
  },
  image: {  
    height: Dimensions.get('window').width * 0.7
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