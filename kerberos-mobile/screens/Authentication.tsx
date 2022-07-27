import { StyleSheet, Image, Text } from "react-native";
import { Button } from "../components";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text as ThemedText, View } from "../components/Themed";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserAuth } from "../navigation/UserAuth";
import * as SecureStore from "expo-secure-store";

export default function Authentication({ navigation }: any) {
  const { isSignedIn, setIsSignedIn } = useContext(UserAuth);
  const navigate = useNavigation<any>();
  //Need to implement logic here
  const UserHasAuthenticated = false;
  if (UserHasAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>You have been verified</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.body}>
          Go to the QR Code and scan it at the Cashier!
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Need to verify your ID</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button onPress={() => navigate.navigate("IDPhoto")}>
        <Text style={styles.body}>Start Verification Process</Text>
      </Button>
      <Button
        onPress={async () => {
          await SecureStore.deleteItemAsync("username");
          await SecureStore.deleteItemAsync("password");
          setIsSignedIn(false);
        }}
      >
        <Text style={styles.body}>Logout</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  body: {
    color: "white",
    fontSize: 15,
  },
});
