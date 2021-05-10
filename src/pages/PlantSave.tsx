import React, { useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Alert, 
    Image,
    ScrollView, 
    Platform, 
    TouchableOpacity } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useRoute } from '@react-navigation/core'
import { SvgFromUri } from 'react-native-svg'
import DateTimerPick, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { loadPlant, PlantProps, savePlant } from '../libs/storage'

import waterdrop from '../assets/waterdrop.png'
import { Button } from '../component/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const route = useRoute()
    const { plant } = route.params as Params;
    const [selectedDateTime, setSelectedDateTime] = useState(new Date)
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState)
        }

        if(dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date);
            return Alert.alert('Selecione uma data no futro')
        }

        if(dateTime)
            setSelectedDateTime(dateTime)
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)
        
    }

    async function hanldeSave() {
        //const data = await loadPlant();

        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })
        } catch  {
            Alert.alert('Não foi possível salvar')
        }
    }

       return(
           <View style={styles.container}>
                <View style={styles.plantInfo}>
                <SvgFromUri
                        uri={plant.photo}
                        width={150}
                        height={150}
                    />
                    <Text style={styles.plantName}>{plant.name}</Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
               </View>
               <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image 
                            source={waterdrop}
                            style={styles.tipImage}
                            />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    <Text style={styles.alertLabel}>
                        Escolha um horário pra ser lembrado
                    </Text>
                    {showDatePicker && (
                        <DateTimerPick
                            value={selectedDateTime}
                            mode='time'
                            display='spinner'
                            onChange={handleChangeTime}
                        />
                    )}
                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                                style={styles.dateTimerPickerButton}
                                onPress={handleOpenDateTimePickerForAndroid}>
                                <Text style={styles.dateTimerPickerText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                    <Button label="Cadastrar planta" onPress={hanldeSave} />
               </View>
           </View>
       ) 
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
        justifyContent: 'space-between',
    },
    plantInfo: {
        alignItems: 'center',
        backgroundColor: colors.shape,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 50,
        fontFamily: fonts.heading
    },
    controller: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
        
    },
    plantName: {
        color: colors.heading,
        fontFamily: fonts.heading,
        fontSize: 24,
        marginTop: 15
    },
    plantAbout: {
        fontFamily: fonts.text,
        textAlign: 'center',
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },
    tipContainer: {
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        bottom: 60,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        position: 'relative',

    }, 
    tipImage: {
        height: 56,
        width: 56,

    },
    tipText: {
        color: colors.blue,
        flex: 1,
        fontSize: 20,
        fontFamily: fonts.text,
        marginLeft: 20,
        textAlign: 'justify'

    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimerPickerButton: {
        alignItems: 'center',
        paddingVertical: 40,
        width: '100%'
    },
    dateTimerPickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
        
    }
})

