import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradientHeaderStyles } from './styles/GradientHeaderStyles';
import { mobileTheme } from '../theme';

const GradientHeader = ({ title, subtitle, rightButton, onRightPress }) => {
    return (
        <View style={gradientHeaderStyles.headerContainer}>
            {/* Gradiente moderno: usiamo Primary e PrimaryDark per più profondità */}
            <LinearGradient
                colors={[mobileTheme.colors.primary, mobileTheme.colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <View style={gradientHeaderStyles.content}>
                <View style={gradientHeaderStyles.titleContainer}>
                    <Text style={gradientHeaderStyles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text style={gradientHeaderStyles.subtitle}>
                            {subtitle}
                        </Text>
                    )}
                </View>

                {rightButton && (
                    <TouchableOpacity
                        style={gradientHeaderStyles.iconButton} // Applica l'effetto Glassmorphism
                        onPress={onRightPress}
                        activeOpacity={0.7}
                    >
                        <Text style={gradientHeaderStyles.icon}>{rightButton}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default GradientHeader;