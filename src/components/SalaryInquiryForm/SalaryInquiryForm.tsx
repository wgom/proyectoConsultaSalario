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
import { Capcha, RootStakParams } from "../../types";
import fetchCapchaAPI from "../../utils/fetchCapcha";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type PostSalaryInquiryNavigationProps = NativeStackNavigationProp<RootStakParams, 'SalaryDetail'>;

const SalaryInquiryForm = () => {
  const [inputValueAno, setInputValueAno] = useState("");
  const handleInputAnoChange = (text: string) => {
    setInputValueAno(text);
  };

  const [inputValueMes, setInputValueMes] = useState("");
  const handleInputMesChange = (text: string) => {
    setInputValueMes(text);
  };

  const [inputValueCi, setInputValueCi] = useState("");
  const handleInputCiChange = (text: string) => {
    setInputValueCi(text);
  };

  const [inputValueIc, setInputValueIc] = useState("");
  const handleInputIcChange = (text: string) => {
    setInputValueIc(text);
  };

  const [inputValueCapcha, setInputValueCapcha] = useState("");
  const handleInputCapchaChange = (text: string) => {
    setInputValueCapcha(text);
  };

  const [capcha, setCapcha] = useState<Capcha>({});

  const loadCapcha = async () => {
    try {
      const capchaResponse = await fetchCapchaAPI();
      //console.log(capchaResponse);
      setCapcha(capchaResponse);
    } catch (error) {
      console.error(error);
      setCapcha({});
    }
  };

  useEffect(() => {
    loadCapcha().catch(null);
  }, []);


  const {navigate} = useNavigation<PostSalaryInquiryNavigationProps>();
  const HandleInquiryPress = () => {
    const capchaId = capcha.id;
    navigate('SalaryDetail', {inputValueAno, inputValueMes, inputValueCi, inputValueIc, inputValueCapcha, capchaId});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textSubtitulo}>
        Consulta de Pagos de Funcionarios y Pensionados Activos
      </Text>
      <View style={styles.contentTextInput}>
        <Text style={styles.text}>Año: </Text>
        <TextInput
          style={styles.textInput}
          value={inputValueAno}
          onChangeText={handleInputAnoChange}
          placeholder="Año"
        />
      </View>
      <View style={styles.contentTextInput}>
        <Text style={styles.text}>Mes: </Text>
        <TextInput
          style={styles.textInput}
          value={inputValueMes}
          onChangeText={handleInputMesChange}
          placeholder="Mes"
        />
      </View>
      <View style={styles.contentTextInput}>
        <Text style={styles.text}>CI: </Text>
        <TextInput
          style={styles.textInput}
          value={inputValueCi}
          onChangeText={handleInputCiChange}
          placeholder="CI"
        />
      </View>
      <View style={styles.contentTextInput}>
        <Text style={styles.text}>IC: </Text>
        <TextInput
          style={styles.textInput}
          value={inputValueIc}
          onChangeText={handleInputIcChange}
          placeholder="IC"
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
        />
      </View>
      <View>
        <TouchableOpacity style={styles.buttonConsultar} onPressIn={HandleInquiryPress}>
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
    width: 160,
    margin: 10,
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
});

export default SalaryInquiryForm;
