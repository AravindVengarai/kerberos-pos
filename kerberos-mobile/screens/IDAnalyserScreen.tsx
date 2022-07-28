import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { Button } from "../components";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScanId from "../integrations/IDAuth";
export default function IDAnalyser({ navigation, route }: any) {
  const { imageURI } = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const navigate = useNavigation<any>();
  useEffect(() => {
    ScanId(imageURI)
      .then((res) => {
        console.log("Got it");
        console.log(res);
        const authentication_result = res["authentication"];
        if (authentication_result) {
          if (authentication_result["score"] > 0.7) {
            setData(res);
            setLoading(false);
          } else {
            Alert.alert(
              "Suspicious ID",
              "Your ID looks suspicious. Please try taking another photo",
              [{ text: "Try Again", onPress: () => navigate.goBack() }]
            );
          }
        }
        else {
            Alert.alert("Unable to Validate", res?.error.message ?? "Could not verify your ID", [
                { text: "Try Again", onPress: () => navigate.goBack() },
            ]);
        }
      })
      .catch((e: any) => {
        console.log("Did not get it");
        console.log(e);
        Alert.alert("Unexpected Error", "Something unexpected happened. Please try again", [
          { text: "Try Again", onPress: () => navigate.goBack() },
        ]);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Verifying your ID</Text>
        {loading && <Text style={styles.body}> Hold On </Text>}
      </View>
      <View style={styles.bottopContainer}>
        {loading ? (
          <>
            <ActivityIndicator
              style={{ marginTop: 50 }}
              size={"large"}
            ></ActivityIndicator>
            <Text style={{ marginTop: 20, fontSize: 15 }}>Loading</Text>
          </>
        ) : (
          <>
            <Text>Authenticity: {data.authentication.score}</Text>
            <Text>Issue Date: {data.result?.issued}</Text>
            <Button onPress={()=>navigate.navigate('FacePhoto', {ID_URI: imageURI})}> Continue</Button>
          </>
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
