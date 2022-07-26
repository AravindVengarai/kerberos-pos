import { StyleSheet, Button, Image, Text, Pressable } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text as ThemedText, View } from "../components/Themed";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Authentication({ navigation }: any) {
  const navigate = useNavigation();
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
      <Pressable
        style={styles.verify}
        onPress={() => navigate.navigate("PhotoID")}
      >
        <Text style={styles.body}>Start Verification Process</Text>
      </Pressable>
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
    marginTop: 10,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  verify: {
    backgroundColor: "#4fbe37",
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    elevation: 1,
    borderRadius: 8,
  },
  body: {
    color: "white",
    fontSize: 15,
  },
});
