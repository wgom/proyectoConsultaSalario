import React from "react";
import { View, StyleSheet } from "react-native";

import Header from "../../components/Header";
import SalaryInquiryForm from "../../components/SalaryInquiryForm";

const Home = () => {


  return (
    <View style={styles.container}>
      <Header />
      <SalaryInquiryForm/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});

export default Home;
