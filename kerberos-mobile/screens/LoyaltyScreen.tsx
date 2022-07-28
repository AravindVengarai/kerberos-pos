import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { UserAuth } from "../navigation/UserAuth";
export default function Loyalty() {
  const { isSignedIn, setIsSignedIn, data }: any = useContext(UserAuth);
  const [loyalty, setLoyalty] = useState<any>();
  const isVerified = data?.verified ?? false;
  if (!isVerified) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Please verify your ID first.</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
    );
  }
  const stores =
    (data?.loyalties ?? []).length == 0
      ? [{ storeName: "None Available", loyaltyID: "" }]
      : data.loyalties;
  return (
    <View style={styles.container}>
      <Picker
        style={{
          width: "80%",
          height: 70,
          backgroundColor: "white",
          borderRadius: 5,
        }}
        selectedValue={loyalty}
        onValueChange={(itemValue, itemIndex) => setLoyalty(itemValue)}
      >
        {stores.map((item: any, index: number) => (
          <Picker.Item
            key={item.number + item.loyaltyID}
            label={item.storeName}
            value={item.loyaltyID}
          />
        ))}
      </Picker>
      <Text style={styles.text}>Loyalty ID: {loyalty}</Text>
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
  text: {
    marginTop: 30,
  },
});
