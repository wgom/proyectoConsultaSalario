import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStakParams } from "../types";
import SalaryInquiry from "../views/SalaryInquiry";
import SalaryDetail from "../views/SalaryDetail";

const Stack = createNativeStackNavigator<RootStakParams>();

const routeScreenDefaultOptions = {
  headerStyle: {
    backgroundColor: "rgba(7,26,93,255)",
  },
  headerTitleStyle: {
    color: "#FFF",
  },
};

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SalaryInquiry">
      <Stack.Screen name="SalaryInquiry" component={SalaryInquiry} options={routeScreenDefaultOptions}/>
      <Stack.Screen name="SalaryDetail" component={SalaryDetail} options={routeScreenDefaultOptions}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
