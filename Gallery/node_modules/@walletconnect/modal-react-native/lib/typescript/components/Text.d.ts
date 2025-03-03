/// <reference types="react" />
import { StyleProp, TextStyle, TextProps } from 'react-native';
interface Props extends TextProps {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
}
declare function Text({ children, style, ...props }: Props): JSX.Element;
export default Text;
//# sourceMappingURL=Text.d.ts.map