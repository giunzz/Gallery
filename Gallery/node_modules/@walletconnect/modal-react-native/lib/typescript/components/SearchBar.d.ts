/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    onChangeText: (text: string) => void;
    style?: StyleProp<ViewStyle>;
}
declare function SearchBar({ onChangeText, style }: Props): JSX.Element;
export default SearchBar;
//# sourceMappingURL=SearchBar.d.ts.map