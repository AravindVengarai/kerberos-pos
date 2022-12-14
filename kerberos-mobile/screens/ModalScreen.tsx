import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "../components/Themed";

export default function Modal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={{ padding: 20, textAlign: "center", fontSize: 17 }}>
        We need to verify your ID before you are ready to skip the wait
        and verify your age seamlessly on all the applicable stores
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
