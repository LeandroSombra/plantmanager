import React, {useState} from 'react'
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback, 
    Platform, 
    Keyboard} from 'react-native'
import {useNavigation} from '@react-navigation/core'

import { Button } from '../component/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'


export function UserIdentification () {

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [name, setName] = useState<string>()

    function handleInputBlur () {
        setIsFocused(false);
        setIsFilled(!!name)
    }

    function handleInputFocus () {
        setIsFocused(true);
    }

    function handeInputChange (value: string) {
        setIsFilled(!!value);
        setName(value)
    }

    const navigation = useNavigation()

    function hanldeSubmit () {
        navigation.navigate('Confirmation')
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.content}>
                            <View style={styles.form}>
                                <View style={styles.header} >
                                    <Text style={styles.emoji}>
                                    { isFilled ? '😁 ': '😀 '}
                                    </Text>
                                    <Text style={styles.title}>Como podemos {`\n`} chamar você?</Text>
                                </View>
                                <TextInput 
                                    style={[
                                        styles.input,
                                        (isFocused || isFilled) && {borderColor: colors.green}
                                    ]}
                                        onBlur={handleInputBlur}
                                        onFocus={handleInputFocus}
                                        onChangeText={handeInputChange}
                                    />
                                <Button label={'Confirmar'} onPress={hanldeSubmit}   />
                            </View>
                        </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
        flex: 1,
        width: '100%',
    },
    header: {
        alignItems: 'center'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
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
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        fontSize: 18,
        margin: 50,
        padding: 10,
        textAlign: 'center',
        width: '100%'
    }
})
