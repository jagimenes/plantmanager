import React from "react";
import { StyleSheet,
         Text, 
         SafeAreaView, 
         Image, 
         Dimensions, 
         View 
    } from "react-native";

import wateringImg from '../assets/watering.png';
import { Button } from "../components/Button";
import fonts from "../styles/fonts";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/core";

export function Welcome() {
    const navigation = useNavigation();
    
    function handleStart() {
        navigation.navigate("UserIdentification");
    }

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas de {'\n'}
                forma fácil
            </Text>

            <Image 
                style={styles.image} 
                source={wateringImg}
                resizeMode="contain" />

            <Text style={styles.subTitle}>
                Não esqueça mais de regar suas plantas. 
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>
            <Button icon="chevron-right" onPress={handleStart} />
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get('window').width * 0.7,
    }
})