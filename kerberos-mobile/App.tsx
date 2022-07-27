import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { View, TextInput, StyleSheet, Text } from "react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import api from "./integrations/api";
import { Button } from "./components";
import { AxiosError, AxiosResponse } from "axios";
import { UserAuth } from "./navigation/UserAuth";
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState("");
  async function handleSignUp() {
    try {
      //Check for duplicate username
      const duplicate = await api.post("findOne", {
        dataSource: "Cluster0",
        database: "kerberos",
        collection: "users",
        filter: {
          username: username,
        },
      });
      if (duplicate.data.document !== null) {
        setError("Username taken");
        return;
      }
      const response = await api.post("insertOne", {
        dataSource: "Cluster0",
        database: "kerberos",
        collection: "users",
        document: {
          username: username,
          password: password,
        },
      });
      handleSignIn();
    } catch (e: any) {
      setError("Could not Sign Up");
    }
  }
  async function handleSignIn(
    user_tmp: string | null = null,
    pass_tmp: string | null = null
  ) {
    try {
      const response = await api.post("findOne", {
        dataSource: "Cluster0",
        database: "kerberos",
        collection: "users",
        filter: {
          username: user_tmp || username,
          password: pass_tmp || password,
        },
      });
      console.log("Got resopnse");
      console.log(response);
      console.log(
        "--------------------------------------------------------------------"
      );
      console.log(response.data.document);
      if (response.data.document === null) throw "Could not Sign In";
      else {
        await SecureStore.setItemAsync("username", username);
        await SecureStore.setItemAsync("password", password);
        setIsSignedIn(true);
      }
    } catch (e: any) {
      setError("Could not Sign In");
    }
  }
  useEffect(() => {
    (async () => {
      let username_stored = await SecureStore.getItemAsync("username");
      let password_stored = await SecureStore.getItemAsync("password");
      console.log(username_stored, password_stored);
      if (!username_stored || !password_stored) {
        setIsSignedIn(false);
      } else {
        setUsername(username_stored);
        setPassword(password_stored);
        handleSignIn(username_stored, password_stored);
      }
    })();
  }, []);
  if (!isLoadingComplete) {
    return null;
  }
  if (!isSignedIn) {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 10, color: "gray" }}>{error}</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(e) => {
            setUsername(e);
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(e) => {
            setPassword(e);
          }}
        ></TextInput>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 150 }}>
          <Button
            style={styles.button}
            onPress={() => {
              handleSignUp();
            }}
          >
            Sign Up
          </Button>
          <View style={{ width: 10 }} />
          <Button
            style={styles.button}
            onPress={() => {
              handleSignIn();
            }}
          >
            Log In
          </Button>
        </View>
      </View>
    );
  }
  return (
    <UserAuth.Provider value={{ isSignedIn, setIsSignedIn }}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </UserAuth.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
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
  button: {
    width: 100,
    height: 40,
  },
  input: {
    textAlign: "center",
    marginTop: 7,
    width: 200,
    height: 40,
    borderRadius: 10,
    elevation: 1,
    backgroundColor: "#edf4fc",
  },
});
