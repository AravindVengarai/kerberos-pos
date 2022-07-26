import React, { useState } from "react";
import { StyleSheet, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { View, Text } from "react-native";

export default function PhotoID({ navigation, route }: any) {
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result;
    try {
      result = await ImagePicker.launchCameraAsync({});

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
