import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { Button } from "../components";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScanFace from "../integrations/FaceAuth";
import api from "../integrations/api";
import { UserAuth } from "../navigation/UserAuth";
import * as FileSystem from "expo-file-system";
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
export default function FaceAnalyser({ navigation, route }: any) {
  const { ID_URI, imageURI } = route.params;
  const { setData, data }: any = useContext(UserAuth);
  const [loading, setLoading] = useState(true);
  const [verify, setVerify] = useState<any>([]);
  const [photo_base64, setPhoto] = useState("");
  const [ID_base64, setID] = useState("");
  const navigate = useNavigation<any>();
  useEffect(() => {
    // console.log(data);
    ScanFace(imageURI, ID_URI)
      .then(async (res) => {
        console.log("Got it");
        console.log(res);
        const authentication_result = res["authentication"];
        if (res.verification.passed) {
          setPhoto(
            await FileSystem.readAsStringAsync(ID_URI, {
              encoding: "base64",
            })
          );
          setID(
            await FileSystem.readAsStringAsync(imageURI, {
              encoding: "base64",
            })
          );
          setVerify(res);
          setLoading(false);
        } else {
          Alert.alert(
            "Unable to Validate",
            "Could not match your picture with your ID",
            [{ text: "Try Again", onPress: () => navigate.goBack() }]
          );
        }
      })
      .catch((e: any) => {
        console.log("Did not get it");
        console.log(e);
        Alert.alert(
          "Unexpected Error",
          "Something unexpected happened. Please try again",
          [{ text: "Try Again", onPress: () => navigate.goBack() }]
        );
      });
  }, []);
  const storeLoyalty = {
    storeName: "publix",
    loyaltyID: (() => {
      let str = "";
      for (let i = 0; i < 6; i++) {
        str += getRandomInt(10);
      }
      console.log("random string");
      console.log(str);
      return str;
    })(),
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Verifying your picture</Text>
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
            <Text>Confidence: {verify.face.confidence}</Text>
            <Button
              onPress={async () => {
                try {
                  setLoading(true);
                  console.log("Before push");
                  const response = await api.post("updateOne", {
                    dataSource: "Cluster0",
                    database: "kerberos",
                    collection: "users",
                    filter: {
                      _id: {
                        $oid: data._id,
                      },
                    },
                    update: {
                      $push: {
                        images: { $each: [photo_base64, ID_base64] },
                        loyalties: { $each: [storeLoyalty] },
                      },
                      $set: {
                        name: verify.result?.firstName ?? "",
                        age: verify.result?.age ?? 0,
                        verified: true,
                      },
                    },
                    upsert: true,
                  });
                  setData(
                    (
                      await api.post("findOne", {
                        dataSource: "Cluster0",
                        database: "kerberos",
                        collection: "users",
                        filter: {
                          _id: { $oid: data._id },
                        },
                      })
                    ).data.document
                  );
                  navigate.navigate("Auth");
                  console.log(response.data);
                  console.log("After Push");
                } catch (e: any) {
                  console.log("Error man");
                  console.log(e.response.data);
                }
              }}
            >
              Finish
            </Button>
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
