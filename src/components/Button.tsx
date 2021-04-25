import { Feather } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from "react-native"
import colors from "../styles/colors"

interface ButtonProps extends TouchableOpacityProps {
    title?: string;
    icon?: string;
}

export function Button({ title, icon, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.button}
            {...rest}>
            
            {
                title && 
                <Text style={styles.buttonText}>
                    {title}
                </Text>
            }

            {
                icon &&
                <Feather
                name="chevron-right"
                style={styles.buttonIcon} />

            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        paddingHorizontal: 10
    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 32
    }
})