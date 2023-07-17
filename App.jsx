import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import { launchImageLibraryAsync } from "expo-image-picker";

import React, { useState } from "react";

import { saveToLibraryAsync, usePermissions } from "expo-media-library";
import { useRef } from "react";
import { captureRef } from "react-native-view-shot";

import { Platform } from "react-native";
import { toJpeg } from "dom-to-image";


// Choose one of the Pokémon images
const placeholderImg = require("./assets/imgs/pikachu.png");

const App = () => {
  const [selectedImg, setSelectedImg] = useState(null); 

  const [status, requestPermission] = usePermissions();

  const imageRef = useRef();

  if (status === null) requestPermission(); 

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      // Check if the application is running in a web browser
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      // If the application is running in a web browser
      try {
        const dataUrl = await toJpeg(imageRef.current, {
          // Take a screenshot of the image
          quality: 0.95,
          width: 320,
          height: 440,
        });
  
        const link = document.createElement("a");
        link.download = "some-img.jpeg"; // Set the name of the downloaded file
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.log(err);
      }
    }
  };

  

  const pickImageAsync = async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImg(result.uri)
    } else {
      alert("You did not select any Pokémon image.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImgSrc={placeholderImg}
            selectedImg={selectedImg}
          />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Button
          theme="primary"
          label="Choose a Pokémon"
          onPress={pickImageAsync}
        />
        <Button label="Use this Pokémon" onPress={onSaveImageAsync} style={styles.buttons} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 50,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  buttons: {
    color: 'black',
    backgroundColor: 'black',
  }
});

