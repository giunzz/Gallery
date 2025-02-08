import { StyleSheet } from 'react-native';
import RectangleDrawing from './components/RectangleDrawing';

export default function App() {
  return (
    <RectangleDrawing />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
