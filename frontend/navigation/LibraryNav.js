import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import LibraryScreen from "../screens/library/Library";
import ArtworkDetailScreen from "../screens/library/ArtworkDetailScreen";
import PublishScreen from "../screens/library/PublishScreen_buy";
import Drawing from "../screens/library/NewArt";
import ArtDetail from "../screens/library/Result_Draw";
import MusicArt from "../screens/library/MusicArt";
import OwnershipScreen from "../screens/library/OwnershipScreen";
import TransferArtScreen from "../screens/library/Transfer";

const LibraryNav = () => {
  const LibraryStack = createStackNavigator();
  return (
    <LibraryStack.Navigator
      initialRouteName="LibraryOverview"
      screenOptions={{ header: () => null, headerShown: false }}>
      <LibraryStack.Screen name="LibraryOverview" component={LibraryScreen} />
      <LibraryStack.Screen
        name="ArtworkDetail"
        component={ArtworkDetailScreen}
      />
      <LibraryStack.Screen name="PublishArtwork" component={PublishScreen} />
      <LibraryStack.Screen name="NewArt" component={Drawing} />
      <LibraryStack.Screen name="ResultDraw" component={ArtDetail} />
      <LibraryStack.Screen name="MusicArt" component={MusicArt} />
      <LibraryStack.Screen name="Ownership" component={OwnershipScreen} />
      <LibraryStack.Screen name="Transfer" component={TransferArtScreen} />
    </LibraryStack.Navigator>
  );
};

export default LibraryNav;
