import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { PlantProps } from '../libs/storage';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [selectedEnviroment, setSelectedEnviroment] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);
    
    const navigation = useNavigation();

    function handleSelectPlant(plant: PlantProps) {
        if (plant) {
            navigation.navigate("PlantSave", { plant });
        }
    }

    function handleFetchMore(distance: number) {
        if(distance < 1) {
            return;
        }

        setLoadMore(true);
        setPage(oldValue => oldValue + 1);

        fetchPlants();
    }

    function handleEnvironmentClick(key: string) {
        setSelectedEnviroment(key);

        if (key === 'all') {
            setFilteredPlants(plants);
        } else {
            const filtered = plants.filter(plant => plant.environments.includes(key));

            setFilteredPlants(filtered);
        }
    }

    async function fetchPlants() {
        const { data } = await api
        .get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`);

        if (!data) {
            setLoading(true);
        }

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        } else {
            setPlants(data);
            setFilteredPlants(data);    
        }
        
        setLoading(false);
        setLoadMore(false);
    }    

    useEffect(() => {
        async function fetch() {
            const { data } = await api
            .get(`plants_environments?_sort=title&order=asc`);
            setEnvironment([
                {
                    key: 'all',
                    title: 'Todos'
                }, 
                ...data
            ]);
        }

        fetch();
    }, []);

    useEffect(() => {
        fetchPlants();
    }, []);

    if (loading)
        return (<Load />)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subTitle}>Você quer colocar sua planta ?</Text>

            </View>
            <View>
                <FlatList
                    data={environment}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnvironmentButton 
                            active={selectedEnviroment === item.key} 
                            title={item.title}
                            onPress={() => handleEnvironmentClick(item.key)}/>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardPrimary 
                            data={item}
                            onPress={() => handleSelectPlant(item)}
                         />
                    )}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainerStyle}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadMore ? 
                            <ActivityIndicator color={colors.green_dark} />
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
        backgroundColor: colors.background
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    header: {
        paddingHorizontal: 30
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    }, 
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }, 
    contentContainerStyle: {
        
    }
});