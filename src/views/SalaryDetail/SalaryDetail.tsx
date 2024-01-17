import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStakParams, SalaryInquiry } from "../../types";
import Header from "../../components/Header";
import fetchSalaryInqueryAPI from "../../utils/fetchSalaryInquery";

const SalaryDetail = () => {
  const [salaryInquiry, setSalaryInquiry] = useState<SalaryInquiry>({});

  const {
    params: {
      inputValueAno,
      inputValueMes,
      inputValueCi,
      inputValueIc,
      inputValueCapcha,
      capchaId,
    },
  } =
    useRoute<NativeStackScreenProps<RootStakParams, "SalaryDetail">["route"]>();

  const loadSalary = async (
    inputValueAno?: string,
    inputValueMes?: string,
    inputValueCi?: string,
    inputValueIc?: string,
    inputValueCapcha?: string,
    capchaId?: string
  ) => {
    try {
      const salaryInquiryResponse = await fetchSalaryInqueryAPI(
        `ci=${inputValueCi}&ic=${inputValueIc}&anio=${inputValueAno}&mes=${inputValueMes}&answer=${inputValueCapcha}&id=${capchaId}`
      );
      setSalaryInquiry(salaryInquiryResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSalary(
      inputValueAno,
      inputValueMes,
      inputValueCi,
      inputValueIc,
      inputValueCapcha,
      capchaId
    ).catch(null);
    //console.log(salaryInquiry.estado);
  }, []);

  //console.log(salaryInquiry.result);
  //console.log(salaryInquiry.estado);


  return (
    <View>
      <Header />
      <View style={styles.container}>
        <View style={styles.containerFuncionario}>
          <Text>Funcionario: </Text>
          <Text style={styles.textFuncionarioData}>{salaryInquiry.result?.data[0][3]}</Text>
          <Text style={styles.textFuncionarioData}> {salaryInquiry.result?.data[0][4]}</Text>
        </View>
        <View style={styles.containerCiIc}>
          <Text>CI: </Text>
          <Text style={styles.textInputValueCi}>{inputValueCi}</Text>
          <Text> IC: </Text>
          <Text style={styles.textInputValueIc}>{inputValueIc}</Text>
        </View>
        <View style={styles.containerFecha}>
          <Text>Mes: </Text>
          <Text style={styles.textInputValueMes}>{inputValueMes}</Text>
          <Text> Año: </Text>
          <Text style={styles.textInputValueAno}>{inputValueAno}</Text>
        </View>
        <View style={styles.table}>
          {salaryInquiry.result?.data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <Text style={styles.cell}>{row[9]}</Text>
              <Text style={styles.cell}>{row[10]}</Text>
              <Text style={styles.cell}>{row[11]}</Text>
            </View>
          ))}
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
    fontWeight: 'bold',
  },
  containerCiIc:{
    flexDirection: "row",
  },
  textInputValueCi:{
    fontWeight: 'bold',
  },
  textInputValueIc:{
    fontWeight: 'bold',
  },
  containerFecha:{
    flexDirection: "row",
  },
  textInputValueMes:{
    fontWeight: 'bold',
  },
  textInputValueAno:{
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',    
  },
  cell: {
    padding: 10,
  },
});

export default SalaryDetail;
