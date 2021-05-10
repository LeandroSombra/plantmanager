import React from 'react'

import { View, Text, StyleSheet, Image} from 'react-native'
import { Header } from '../component/Header'
import colors from '../styles/colors'

export function MyPlants() {
    return (
        <View style={styles.container}>
            <Header />
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,

    }
})