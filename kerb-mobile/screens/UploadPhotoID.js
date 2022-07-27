import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { Button } from "../components";
import * as ImagePicker from "expo-image-picker";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PhotoID({ navigation, route }) {
  const [image, setImage] = useState<any>(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const navigate = useNavigation<any>
  useEffect(() => {
    if (!(status?.granted ?? false)) {
      (async () => {
        const res = await requestPermission();
        console.log(res);
        if (!res.granted) {
          Alert.alert(
            "Need Camera Permission",
            "Please allow the app to access the camera",
            [
              {
                text: "Start Over",
                onPress: () => navigate.navigate("Auth"),
              },
            ]
          );
        }
      })();
    }
  }, []);
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
      <View style={styles.topContainer}>
        <Text style={styles.title}>Verify your ID</Text>
        <Text style={styles.body}>Take photo of your goverment issued ID </Text>
      </View>
      <View style={styles.bottopContainer}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "95%", height: "60%" }}
          />
        )}
        {image ? (
          <View style={styles.buttonGroup}>
            <Button style={styles.leftButton} onPress={pickImage}>
              Retake Photo
            </Button>
            <Button style={styles.rightButton} onPress={pickImage}>
              Continue
            </Button>
          </View>
        ) : (
          <Button
            style={{ marginTop: "auto", marginBottom: 50 }}
            onPress={pickImage}
          >
            Take Photo of ID
          </Button>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  topContainer: { flex: 1, alignItems: "center" },
  bottopContainer: { flex: 4, width: "100%", alignItems: "center" },
  title: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    marginTop: 20,
    fontSize: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 50,
    width: 300,
    justifyContent: "space-between",
  },
  leftButton: {
    width: 130,
    backgroundColor: "#257a87",
  },
  rightButton: {
    width: 130,
  },
});