import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStakParams, SalaryInquiry } from "../../types";
import Header from "../../components/Header";

const SalaryDetail = () => {
  let totalSalario = 0; // Declaración inicial de totalSalario
  const {
    params: { result, estado },
  } =
    useRoute<NativeStackScreenProps<RootStakParams, "SalaryDetail">["route"]>();
  //console.log(salaryInquiry.result);
  //console.log(salaryInquiry.estado);
  const months = [
    { label: "Enero", value: "1" },
    { label: "Febrero", value: "2" },
    { label: "Marzo", value: "3" },
    { label: "Abril", value: "4" },
    { label: "Mayo", value: "5" },
    { label: "Junio", value: "6" },
    { label: "Julio", value: "7" },
    { label: "Agosto", value: "8" },
    { label: "Septiembre", value: "9" },
    { label: "Octubre", value: "10" },
    { label: "Noviembre", value: "11" },
    { label: "Diciembre", value: "12" },
  ];

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <View style={styles.containerFuncionario}>
          <Text>Funcionario: </Text>
          <Text style={styles.textFuncionarioData}>{result?.data[0][3]}</Text>
          <Text style={styles.textFuncionarioData}> {result?.data[0][4]}</Text>
        </View>
        <View style={styles.containerEntidad}>
          <Text>Entidad: </Text>
          <Text style={styles.textEntidad}>{result?.data[0][7]}</Text>
        </View>
        <View style={styles.containerCi}>
          <Text>CI: </Text>
          <Text style={styles.textInputValueCi}>{result?.data[0][2]}</Text>
        </View>
        <View style={styles.containerFecha}>
          <Text>Mes: </Text>
          <Text style={styles.textInputValueMes}>
            {months.find((month) => month.value === result?.data[0][1])?.label}
          </Text>
          <Text> Año: </Text>
          <Text style={styles.textInputValueAno}>{result?.data[0][0]}</Text>
        </View>
        <View style={styles.table}>
          {result?.data.map((row, rowIndex) => {
            totalSalario = totalSalario + parseInt(row[11], 10);
            return (
              <View key={rowIndex} style={styles.row}>
                <Text style={styles.cell}>{row[9]}</Text>
                <Text style={styles.cell}>{row[10]}</Text>
                <Text style={styles.cell}>
                  {parseInt(row[11]).toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.containerTotal}>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>TOTAL: </Text>
          <Text style={{ marginTop: 10, fontWeight: "bold", flex: 1, textAlign: 'right'}}>{totalSalario.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerFuncionario: {
    flexDirection: "row",
  },
  textFuncionarioData: {
    fontWeight: "bold",
  },
  containerEntidad: {
    flexDirection: "row",
  },
  textEntidad: {
    fontWeight: "bold",
  },
  containerCi: {
    flexDirection: "row",
  },
  textInputValueCi: {
    fontWeight: "bold",
  },
  containerFecha: {
    flexDirection: "row",
  },
  textInputValueMes: {
    fontWeight: "bold",
  },
  textInputValueAno: {
    fontWeight: "bold",
  },
  table: {
    borderWidth: 1,
    borderColor: "black",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  cell: {
    padding: 10,
  },
  containerTotal: {
    flexDirection: "row",
    marginHorizontal: 70,    
  },
});

export default SalaryDetail;
