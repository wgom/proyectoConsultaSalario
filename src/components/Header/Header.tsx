import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image style={styles.image} source={require("../../../assets/mef-logo.png")}></Image>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Dirección General de Tesoro Público</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image style={styles.image} source={require("../../../assets/mef-guarani-logo.png")}></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: '#000',
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default Header;
