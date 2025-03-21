import React, { useState, useEffect, useRef, useLayoutEffect } from "react"; // Import useRef
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { getMusic } from "../../services/apiService";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import Header from "../../components/AccountFlow/Header";

const MusicArt = ({ route }) => {
  const navigation = useNavigation(); // Hook for navigation

  const { item } = route.params || {};
  console.log(item);
  const [musicDetails, setMusicDetails] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sound, setSound] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const sliderRef = useRef(null);
  const [isSeeking, setIsSeeking] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the default header
    });
  }, [navigation]);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        console.log("Token:", item.token);
        const musicData = await getMusic(item.token);
        console.log(musicData);
        if (musicData && musicData.url && musicData.end) {
          setMusicDetails({
            url: musicData.url,
            title: musicData.token || "Unknown Title",
            artist: musicData.address || "Unknown Artist",
            duration: parseFloat(musicData.end),
            start: parseFloat(musicData.start),
          });
        } else {
          Alert.alert("Error", "Incomplete music data received.");
          setMusicDetails(null);
        }
      } catch (error) {
        console.error("API Error:", error);
        Alert.alert("Error", `Failed to load music data: ${error.message}`);
        setMusicDetails(null);
      }
    };
    fetchMusicData();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const loadAndPlaySound = async () => {
      if (musicDetails) {
        try {
          if (sound) {
            await sound.unloadAsync();
          }
          const { sound: newSound, status } = await Audio.Sound.createAsync(
            { uri: musicDetails.url },
            {
              shouldPlay: isPlaying,
              progressUpdateIntervalMillis: 50, // Frequent updates
              rate: 1.0,
              shouldCorrectPitch: true,
              volume: 1.0,
            },
            updateScreenForSoundStatus
          );

          // Set the starting position based on the `start` time
          await newSound.setPositionAsync(musicDetails.start * 1000); // This line sets the start time

          setSound(newSound);
          setDuration(status.durationMillis / 1000);
        } catch (error) {
          console.error("Sound Load/Play Error:", error);
          Alert.alert("Error", "Failed to load or play the music.");
        }
      }
    };
    loadAndPlaySound();
  }, [musicDetails, isPlaying]);

  const updateScreenForSoundStatus = (status) => {
    if (status.isLoaded) {
      if (!isSeeking) {
        setProgress(status.positionMillis / 1000);
      }
      setIsBuffering(status.isBuffering);

      if (status.didJustFinish) {
        setIsPlaying(false);
        setProgress(0);
        if (sound) {
          sound.setPositionAsync(0);
        }
      }
    } else if (status.error) {
      console.error("Sound Status Error:", status.error);
      Alert.alert("Error", "Playback error occurred.");
      setIsPlaying(false);
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;
    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Play/Pause Error:", error);
      Alert.alert("Error", "Failed to play/pause music.");
    }
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekComplete = async (value) => {
    setIsSeeking(false);
    if (sound) {
      try {
        await sound.setPositionAsync(value * 1000);
        setProgress(value);
      } catch (error) {
        console.error("Seek Error:", error);
      }
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Helper function to format time in MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedMins = String(mins).padStart(2, "0"); // Pad with 0 if needed
    const formattedSecs = String(secs).padStart(2, "0"); // Pad with 0 if needed
    return `${formattedMins}:${formattedSecs}`;
  };

  if (!musicDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        goBack={true}
        title="Playing Now"
        navigation={navigation}
        icon={false}
        onBackPress={() =>
          navigation.navigate("MainTabs", { screen: "Explore" })
        }
      />
      {/* <View style={styles.header}>
                <TouchableOpacity onPress={handleHome}>
                    <Text style={styles.homeButton}>Home</Text>
                </TouchableOpacity>
            </View> */}

      <View style={styles.artworkContainer}>
        <Image source={{ uri: item.url }} style={styles.image} />
        <View style={styles.dotsContainer}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
        </View>
      </View>

      <View style={styles.trackInfoContainer}>
        <Text style={styles.title}>{musicDetails.title}</Text>
        <Text style={styles.artist}>{musicDetails.artist}</Text>
      </View>

      <View style={styles.favoriteIconContainer}>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.musicControls}>
        <View style={styles.progressContainer}>
          {/* Use formatted time */}
          <Text style={styles.time}>{formatTime(progress)}</Text>
          <Slider
            ref={sliderRef}
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={progress}
            onValueChange={handleSeekStart}
            onSlidingComplete={handleSeekComplete}
            thumbTintColor="#79D7BE"
            minimumTrackTintColor="#79D7BE"
            maximumTrackTintColor="lightgray"
          />
          {/* Use formatted time */}
          <Text style={styles.time}>{formatTime(duration)}</Text>
        </View>

        <View style={styles.playPauseContainer}>
          <TouchableOpacity>
            <Ionicons name="play-skip-back" size={32} color="#333" />
          </TouchableOpacity>
          {isBuffering ? (
            <ActivityIndicator size="large" color="#79D7BE" />
          ) : (
            <TouchableOpacity
              onPress={handlePlayPause}
              style={styles.playPauseButton}>
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={48}
                color="white"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <Ionicons name="play-skip-forward" size={32} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  loadingContainer: {
    flex: 1,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  homeButton: {
    color: "#79D7BE",
    fontWeight: "bold",
  },
  artworkContainer: {
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 15,
    resizeMode: "cover",
  },
  dotsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  trackInfoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  favoriteIconContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  artist: {
    fontSize: 18,
    color: "#777",
  },
  musicControls: {
    width: "100%",
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  time: {
    fontSize: 14,
    color: "#555",
    marginHorizontal: 8,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  playPauseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  playPauseButton: {
    backgroundColor: "#79D7BE",
    borderRadius: 40,
    padding: 15,
    marginHorizontal: 30,
  },
});

export default MusicArt;
