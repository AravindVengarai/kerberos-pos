import React from 'react';
import Realm from 'realm';
import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import App from '../realmApp'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  var User = null;

  async function logIn() {
    try {
      const credentials = Realm.Credentials.emailPassword(
        "flymontagmusic@gmail.com",
        "password"
      )
      const user = await App.logIn(credentials);
      console.log("Successfully logged in!", user.id);
      User = user;
    } catch {
      console.error("Failed to log in");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button 
      title="log in"
      onPress={() => logIn()}
      >
        
      </Button>
      <br>
      </br>
      <Button title="sign up">
      </Button>
    </View>
  );
}


/*
// Create an email/password credential
const credentials = Realm.Credentials.emailPassword(
  "joe.jasper@example.com",
  "passw0rd"
);
try {
  const user = await app.logIn(credentials);
  console.log("Successfully logged in!", user.id);
  return user;
} catch (err) {
  console.error("Failed to log in", err.message);
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
