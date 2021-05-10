import React, { useEffect, useState } from 'react'
import { getStatusBarHeight }  from 'react-native-iphone-x-helper'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


import UserImg from '../assets/user.jpeg'
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Header () {
    const [userName, setUserName] = useState<string>()

    useEffect(()=> {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(user || '')
        }
        loadStorageUserName()
    }, [])

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image style={styles.image} source={UserImg} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getStatusBarHeight(),
        width: '100%',
    },
    image: {
        borderRadius: 40,
        height: 70,
        width: 70,
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
    }
})