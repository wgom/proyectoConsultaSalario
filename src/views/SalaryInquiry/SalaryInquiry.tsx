import React from "react";
import { View, StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import Header from "../../components/Header";
import SalaryInquiryForm from "../../components/SalaryInquiryForm";

const Home = () => {


  return (
    <View style={styles.container}>
      <Header />
      <SalaryInquiryForm/>
      <FlashMessage position="top" />
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
