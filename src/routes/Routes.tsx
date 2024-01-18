import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStakParams } from "../types";
import SalaryInquiry from "../views/SalaryInquiry";
import SalaryDetail from "../views/SalaryDetail";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

const Stack = createNativeStackNavigator<RootStakParams>();

const routeScreenDefaultOptions = {
  headerStyle: {
    backgroundColor: "rgba(7,26,93,255)",
  },
  headerTitleStyle: {
    color: "#FFF",
  },
  title: 'Desarrollado por =>',
  headerRight: () => (
    <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/wigom')}>
    <View style={{ marginRight: 10 }}>
      <Text style={styles.textRight}>@wigom</Text>
    </View>
  </TouchableOpacity>
  ),
};

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SalaryInquiry">
      <Stack.Screen
        name="SalaryInquiry"
        component={SalaryInquiry}
        options={routeScreenDefaultOptions}
      />
      <Stack.Screen
        name="SalaryDetail"
        component={SalaryDetail}
        options={routeScreenDefaultOptions}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  textRight: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff",
  },
});

export default Routes;
