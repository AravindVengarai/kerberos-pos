import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import Realm from 'realm'
import { Button, StyleSheet, Text, View } from 'react-native';
import { getRealmApp } from './realmApp';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './navigation';
export default function App() {
  const [user, setUser] = useState(null)

  if (user != null) {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    )
  } else {
    return (
      <View style={styles.container}>
    <Text style={styles.title}>kerberos</Text>
    
    <Button color="black" title="log in" onPress={() => {
      logIn(user).then(resp => {
        setUser(resp)
        console.log(resp.id)
      }).catch((e) => {
        console.error(e)
      })
    }}>
    </Button>
    <StatusBar style="auto" />
    </View>
    )
  }
}

async function logIn(user) {
  const credentials = Realm.Credentials.emailPassword(
    "flymontagmusic@gmail.com",
    "password"
  );
  try {
    user = await getRealmApp().logIn(credentials);
    console.log("Successfully logged in!");
    return user;
  } catch (err) {
    console.error("Failed to log in", err.message);
    return null
  }
}

async function logOut(user) {
  console.log("Successfully logged out!")
  await getRealmApp().currentUser.logOut();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#54B948',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 20,
    color: 'white',
  }
});
