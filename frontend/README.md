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
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Card = ({ title, children, imageSource, style, backgroundColor = "#6200EE" }) => {
  return (
    <View style={[styles.card, { backgroundColor }, style]}>
      {/* Header (Icon + Title) */}
      <View style={styles.header}>
        {imageSource && <Image source={imageSource} style={styles.icon} />}
        {title && <Text style={styles.cardTitle}>{title}</Text>}
      </View>

      {/* Content (Text or Child Components) */}
      <View style={styles.contentContainer}>
        {typeof children === "string" ? (
          <Text style={styles.cardContent}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
    color: "#FFFFFF",
    flexShrink: 1, // Prevents overflow
  },
  contentContainer: {
    marginTop: 10,
  },
  cardContent: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default Card;
