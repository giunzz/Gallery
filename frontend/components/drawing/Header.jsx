import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {useTheme} from "../../theme";
import RoundButton from "./RoundButton";
import ColorPicker from "reanimated-color-picker";

const Header = ({ setPaintStyle, paintStyle }) => {
    const { theme, insets } = useTheme();
    const [showModal, setShowModal] = useState(false);

    const onSelectColor = ({ hex }) => {
        setPaintStyle({ ...paintStyle, color: hex });
    };

    const sizes = [2, 4, 6, 10, 15, 20, 25, 30];
    const setStrokeWidth = (width) => {
        setPaintStyle({ ...paintStyle, strokeWidth: width });
    };

    return (
        <>
            <LinearGradient
                start={theme.background.gradient.start}
                colors={theme.background.gradient.colors}
                style={[styles.gradient, { paddingTop: insets.top }]}>
                <View style={styles.sizesContainer}>
                    {sizes.map((size) => (
                        <RoundButton
                            key={size}
                            label={size}
                            active={paintStyle.strokeWidth === size}
                            style={{
                                backgroundColor:
                                    paintStyle.strokeWidth === size ? theme.colors.primary : 'transparent',
                            }}
                            onPress={() => setStrokeWidth(size)}
                        />
                    ))}
                    <RoundButton
                        onPress={() => setShowModal(true)}
                        style={{ backgroundColor: paintStyle.color }}
                    />
                </View>
            </LinearGradient>
            <ColorPicker
                onSelectColor={onSelectColor}
                selectedColor={paintStyle.color}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    gradient: {
        display: 'flex',
        paddingHorizontal: '5%',
        paddingBottom: '2.5%',
    },
    icon: {
        marginRight: 0,
    },
    sizesContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        // @ts-ignore
        gap: '3%',
    },
});

export default Header;