import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import QRCode from "react-native-qrcode-svg";
export default function QRCodeScreen({ navigation, route }: any) {
  const userID = "Should be passed in from authentication";
  return (
    <View style={styles.container}>
      <QRCode value="userID" size={250} />
      <Text style={styles.info}>Show this at the Cashier</Text>
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
  info: {
    marginTop: 16,
    fontSize: 17,
  },
});
