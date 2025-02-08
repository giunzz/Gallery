import {useTheme} from "../../theme";
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
const RoundButton = ({ onPress, active, label, style }) => {
    const {theme} = useTheme();
    return (<TouchableHighlight
        underlayColor={"#eee"}
        style={styles.buttonWrapper}
        onPress={onPress}>
        <View
            style={[
                {
                    borderColor: theme.colors.accent,
                },
                styles.container,
                style,
            ]}>
            <Text
                style={[
                    {
                        color: active
                            ? theme.colors.textColors.primaryText
                            : theme.colors.textColors.secondaryText,
                    },
                    styles.text,
                ]}>
                {label}
            </Text>
        </View>
    </TouchableHighlight>);
}

export default RoundButton;

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
    },
    buttonWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});