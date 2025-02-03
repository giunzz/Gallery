# Gallery

Choose a template: » blank  
```
    cd frontend
    npm start 
```

```
│── /frontend (React Native app)
│   ├── /components  # Reusable components
│   ├── /screens     # App screens
│   ├── /navigation  # Navigation setup
│   ├── /redux (or /context)  # State management
│   ├── /services    # API calls
│   ├── /assets      # Images, fonts, etc.
│   ├── App.js       # Main entry point
│   ├── index.js     # Entry file
│   ├── .env            # Environment variables
│   ├── package.json     # Dependencies
│   ├── babel.config.js  # Babel configuration
│   ├── metro.config.js  # Metro bundler config
│   ├── tsconfig.json    # If using TypeScript
│   ├── README.md        # Frontend docs
│
```
import React from 'react';
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Card from '../components/Card';
import ColorImage from '../assets/home/Color.png'; // Update the path to your image
import ShopImage from '../assets/home/Shop.png'; // Update the path to your image
import GenArt from '../assets/home/Gallery Add.png'; // Update the path to your image
import Header from '../components/Header'; // Import the Header component
import UpgradeIcon from '../assets/home/Ellipse.png'; // Import the upgrade icon
import ProfilePic from '../assets/home/person_2.png'; // Import the profile picture

const UserHeader = () => {
    return (
        <View style={styles.container}>
        <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hi, David!</Text>
            <Text style={styles.subtitleText}>Explore the world</Text>
        </View>
        <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.buttonText}>Upgrade</Text>
            <Image
            source={UpgradeIcon} 
            style={styles.icon}
            />
        </TouchableOpacity>
        <Image
            source={ProfilePic} // Use the imported profile picture
            style={styles.profilePicture}
        />
        </View>
    );
    };
