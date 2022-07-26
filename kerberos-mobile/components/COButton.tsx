import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ children, style = {}, ...rest }: any) {
  if (typeof (children === "string")) {
    return (
      <Pressable style={{ ...styles.button, ...style }} {...rest}>
        <Text style={styles.body}>{children}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable style={styles.button} {...rest}>
      {children}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
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
    textAlign: 'center'
  },
});
