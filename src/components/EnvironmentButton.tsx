import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnvironmentButton({title, active = false, ...rest}: EnvironmentButtonProps) {
    return (
        <RectButton
            style={[styles.button, active && styles.buttonActive]}
            {...rest}
        >
            <Text style={[styles.text, active && styles.textActive]}>
                {title}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 5,
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    buttonActive: {
        color: colors.green,
        backgroundColor: colors.green_light
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text
    },
    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
    }
});