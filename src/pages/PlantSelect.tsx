import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import colors from '../styles/colors'

import { Header } from '../component/Header'
import fonts from '../styles/fonts'
import { EnvironmentButton } from '../component/EnvironmentButton'
import { PlantCardPrimary } from '../component/PlantCardPrimary'
import api from '../services/api'
import {Load} from '../component/Load'
import { useNavigation } from '@react-navigation/core'
import { PlantProps } from '../libs/storage'

interface EnvironmentProps {
    key: string;
    title: string;
}


export function PlantSelect () {
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
    const [plants, setPlants] = useState<PlantProps[]>([])
    const [environmentSelected, setEnvironmentSelected] = useState('all')
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([])
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadedAll, setLoadedAll] = useState(false)
    const navigation = useNavigation();

    function handleEnvironmentSelected(enviroment: string) {
        setEnvironmentSelected(enviroment)

        if(enviroment === 'all')
            return setFilteredPlants(plants)
        
        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        )

        setFilteredPlants(filtered)
    }


    function handlePlantSelect(plant: PlantsProps) {
        navigation.navigate('PlantSave', { plant })
        
    }

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

        if(!data)
            return setLoading(true)

         if(page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
         } else {
            setPlants(data)
            setFilteredPlants(data)
         }  

        
        setLoading(false)
        setLoadingMore(false)
    }

    function handleFetchMore(distance: number) {
        if(distance < 1)
            return;
        
        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }

    useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc')

            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ])
        }

        fetchEnvironment()
    }, [])

    useEffect(() => {
        
        fetchPlants()
    }, [])

    if(loading)
        return <Load />

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subTitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList 
                    data={environments}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <EnvironmentButton 
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList 
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item}
                            onPress={() => handlePlantSelect(item)} />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) =>
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore ?
                            <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,

    },
    subTitle: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
    },
    environmentList: {
        justifyContent: 'center',
        height: 40,
        marginLeft: 32,
        marginVertical: 32,
        paddingBottom: 5,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})