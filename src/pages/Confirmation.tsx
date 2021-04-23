import React from 'react'
import { useNavigation } from '@react-navigation/core'

import {SafeAreaView, StyleSheet, Text, View} from 'react-native'


import { Button } from '../component/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Confirmation () {
    const navigation = useNavigation();

    function handleMoveOn() {
        navigation.navigate('PlantSelect')    
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😀 
                </Text>
                <Text style={styles.title}>
                   Prontinho
                </Text>

                <Text style={styles.subTitle}>
                    Agora vamos começar a cuidar das suas plantinhas com muito cuidado
                </Text>
                <Button label={'Começar'} onPress={handleMoveOn}   />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around',
        width: '100%',
    },
    content: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        width: '100%',
    },
    emoji: {
        fontSize: 44
    },
    title: {
        color: colors.green,
        fontSize: 24,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20,
        textAlign: 'center',
    },
    subTitle: {
        fontFamily: fonts.complement,
        fontSize: 17,
    }
    
})