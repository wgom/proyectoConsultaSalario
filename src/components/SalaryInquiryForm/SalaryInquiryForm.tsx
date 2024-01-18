import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Capcha, RootStakParams, SalaryInquiry } from "../../types";
import fetchCapchaAPI from "../../utils/fetchCapcha";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import fetchSalaryInqueryAPI from "../../utils/fetchSalaryInquery";
import { showMessage, hideMessage } from "react-native-flash-message";
import RNPickerSelect from "react-native-picker-select";

type PostSalaryInquiryNavigationProps = NativeStackNavigationProp<
  RootStakParams,
  "SalaryDetail"
>;

const SalaryInquiryForm = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => ({
    label: (currentYear - index).toString(),
    value: (currentYear - index).toString(),
  }));
  const [inputValueAno, setInputValueAno] = useState(currentYear.toString()); // Año seleccionado por defecto

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
  const currentMonth = new Date().getMonth() + 1; // Obtener el mes actual (1-12)
  const [inputValueMes, setInputValueMes] = useState(currentMonth.toString());

  const [inputValueCi, setInputValueCi] = useState("");
  const handleInputCiChange = (text: string) => {
    // Eliminar cualquier caracter que no sea un número
    const cleanedText = text.replace(/[^0-9]/g, "");
    // Formatear el número con separadores de miles
    const formattedText = Number(cleanedText).toLocaleString();
    setInputValueCi(formattedText);
  };

  const [inputValueIc, setInputValueIc] = useState("");
  const handleInputIcChange = (text: string) => {
    // Eliminar cualquier caracter que no sea un número
    const cleanedText = text.replace(/[^0-9]/g, "");
    // Aplicar el formato xxx-xxxxxxxx-xxx
    const formattedText = formatIC(cleanedText);
    setInputValueIc(formattedText);
  };

  const formatIC = (value: string) => {
    // Aplicar el formato xxx-xxxxxxxx-xxx
    const match = value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,8})(\d{0,3})/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]}-${match[2]}-${match[3]}`;
    } else {
      return value; // Mantener el valor original si no hay coincidencia
    }
  };

  const [inputValueCapcha, setInputValueCapcha] = useState("");
  const handleInputCapchaChange = (text: string) => {
    const lowerCaseText = text.toLowerCase(); // Convertir las letras a minúsculas
    setInputValueCapcha(lowerCaseText);
  };

  const [capcha, setCapcha] = useState<Capcha>({});

  const loadCapcha = async () => {
    try {
      const capchaResponse = await fetchCapchaAPI();
      setCapcha(capchaResponse);
    } catch (error) {
      console.error(error);
      setCapcha({});
    }
  };

  const { navigate } = useNavigation<PostSalaryInquiryNavigationProps>();

  const [salaryInquiry, setSalaryInquiry] = useState<SalaryInquiry>({});

  const loadSalary = async (
    inputValueAno: string,
    inputValueMes: string,
    inputValueCi: string,
    inputValueIc: string,
    inputValueCapcha: string,
    capchaId?: string
  ) => {
    try {/*
      console.log(
        inputValueAno +
          " " +
          inputValueMes +
          " " +
          inputValueCi.replace(/\D/g, "") +
          " " +
          inputValueIc +
          " " +
          inputValueCapcha +
          " " +
          capcha.id
      );*/
      const salaryInquiryResponse = await fetchSalaryInqueryAPI(
        `ci=${inputValueCi.replace(
          /\D/g,
          ""
        )}&ic=${inputValueIc}&anio=${inputValueAno}&mes=${inputValueMes}&answer=${inputValueCapcha}&id=${capchaId}`
      );
      //console.log("salaryInquiryResponse: "+salaryInquiryResponse.estado);
      setSalaryInquiry(salaryInquiryResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const HandleInquiryPress = () => {
    //console.log(inputValueAno, inputValueMes, inputValueCi,inputValueIc,inputValueCapcha);
    if (
      !inputValueAno ||
      !inputValueMes ||
      !inputValueCi ||
      !inputValueIc ||
      !inputValueCapcha
    ) {
      loadCapcha().catch(null);
      showMessage({
        message: "Advertencia",
        description: "Todos los campos deben estar cargados.",
        type: "warning",
        duration: 3000,
      });
    } else {
      loadSalary(
        inputValueAno,
        inputValueMes,
        inputValueCi,
        inputValueIc,
        inputValueCapcha,
        capcha.id
      );
    }
  };

  useEffect(() => {
    if (
      salaryInquiry.estado !== undefined &&
      salaryInquiry.estado.trim() !== "error"
    ) {
      const result = salaryInquiry.result;
      const estado = salaryInquiry.estado;
      navigate("SalaryDetail", { result, estado });
    } else if (
      salaryInquiry.estado?.trim() == "error" &&
      salaryInquiry.result?.data[0][0] == ""
    ) {
      loadCapcha().catch(null);
      showMessage({
        message: "Info",
        description: "No se encontraron Registros",
        type: "info",
        duration: 3000,
      });
    } else if (salaryInquiry.estado?.trim() == "error") {
      loadCapcha().catch(null);
      showMessage({
        message: salaryInquiry.estado?.trim(),
        description: salaryInquiry.result?.data[0][0],
        type: "danger",
        duration: 3000,
      });
    }
  }, [salaryInquiry]);

  useEffect(() => {
    loadCapcha().catch(null);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textSubtitulo}>
        Consulta de Pagos de Funcionarios y Pensionados Activos
      </Text>

      <View style={styles.contentTextInput}>
        <Text style={styles.text}>Año: </Text>
        <View style={styles.RNPickerSelect}>
          <RNPickerSelect
            items={years}
            onValueChange={(value) => setInputValueAno(value)}
            value={inputValueAno}
          />
        </View>
      </View>

      <View style={styles.contentTextInput}>
        <Text style={styles.text}>Mes: </Text>
        <View style={styles.RNPickerSelect}>
          <RNPickerSelect
            items={months}
            onValueChange={(value) => setInputValueMes(value)}
            value={inputValueMes}
          />
        </View>
      </View>

      <View style={styles.contentTextInput}>
        <Text style={styles.text}>CI: </Text>
        <TextInput
          style={styles.textInput}
          value={inputValueCi}
          onChangeText={handleInputCiChange}
          placeholder="CI"
          keyboardType="numeric" // Mostrar teclado numérico
          textAlign="center"
        />
      </View>

      <View style={styles.contentTextInput}>
        <Text style={styles.text}>IC: </Text>
        <TextInput
          style={styles.textInput}
          value={inputValueIc}
          onChangeText={handleInputIcChange}
          placeholder="IC"
          keyboardType="numeric" // Mostrar teclado numérico
          textAlign="center"
        />
      </View>

      <View style={styles.contentCapcha}>
        <View style={styles.contentImageCapcha}>
          <Image
            style={styles.imageCapcha}
            source={{ uri: "data:image/png;base64, " + capcha.ic }}
          />
        </View>
        <View style={styles.contentIconSync}>
          <TouchableOpacity onPress={loadCapcha}>
            <Icon style={styles.iconSync} name="retweet"></Icon>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textInputCapcha}
          value={inputValueCapcha}
          onChangeText={handleInputCapchaChange}
          placeholder="Ingrese el Capcha"
          autoCapitalize="none"
          textAlign="center"
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonConsultar}
          onPressIn={HandleInquiryPress}
        >
          <Text style={styles.textButton}>Consultar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  textSubtitulo: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  contentTextInput: {
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    margin: 5,
  },
  text: {
    width: 40,
    textAlign: "right",
    fontWeight: "bold",
  },
  textInput: {
    flex: 1,
    height: 30,
    width: 120,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
  },
  contentCapcha: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  contentImageCapcha: {
    height: 30,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderWidth: 1,
    borderColor: "#000",
  },
  imageCapcha: {
    resizeMode: "contain",
    width: 99,
    height: 28,
  },
  textInputCapcha: {
    height: 30,
    width: 120,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    marginLeft: 5,
  },
  contentIconSync: {},
  iconSync: {
    marginLeft: 5,
    fontSize: 25,
    color: "rgba(7,26,93,255)",
  },
  buttonConsultar: {
    backgroundColor: "rgba(7,26,93,255)", // Color de fondo del botón
    marginTop: 20,
    padding: 10,
    borderRadius: 10, // Valor del radio de los bordes para hacerlos redondeados
  },
  textButton: {
    color: "white",
    textAlign: "center",
  },
  RNPickerSelect: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    height: 30,
  },
});

export default SalaryInquiryForm;
