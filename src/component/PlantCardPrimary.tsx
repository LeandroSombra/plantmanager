import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface PlantProps extends RectButtonProps {
    data: {
        name: string,
        photo: string
    }
}

export const PlantCardPrimary = ({ data, ...rest}: PlantProps) => {
    return(
        <RectButton style={styles.container} {...rest}>
            <SvgFromUri uri={data.photo} width={70} height={70} />
            <Text style={styles.text}>
                {data.name}
            </Text>
        </RectButton>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.shape,
        borderRadius: 10,
        flex: 1,
        height: 600,
        justifyContent: 'center',
        maxWidth: '45%',
        margin: 10,
        paddingVertical: 10
    },
    text: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
        
    }
})