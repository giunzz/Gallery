import {useRef, useState, useEffect} from 'react';
import {View, Button, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

const ScanMain = ({navigation}) => {
  const device = useCameraDevice('back');
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      navigation.navigate('PreviewScreen', {imageUri: `file://${photo.path}`});
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {device && (
        <View style={{flex: 1}}>
          <Camera
            ref={cameraRef}
            style={{flex: 1}}
            device={device}
            isActive
            photo={true}
          />
          <Button title="Take Picture" onPress={takePicture} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScanMain;
