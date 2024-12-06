import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { FontAwesome } from "@expo/vector-icons";
import constStyles from "@/const/Styles";
import { colors } from "@/const/colors";

const PhoneNumberInput = ({
  placeholder,
  value,
  onChangeText,
  style,
  ...props
}) => {
  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <TouchableOpacity
        style={styles.countryPicker}
        onPress={() => setIsPickerVisible(true)}
      >
        <CountryPicker
          countryCode={countryCode}
          withCallingCode
          withFlag
          withFilter
          withAlphaFilter
          onSelect={onSelect}
          visible={isPickerVisible}
          onClose={() => setIsPickerVisible(false)}
        />
        <Text style={styles.callingCode}>+{callingCode}</Text>
      </TouchableOpacity>
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType="phone-pad"
        style={styles.phoneInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  callingCode: {
    fontSize: 16,
    marginLeft: 5,
    color: colors.textPrimary,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
});

export default PhoneNumberInput;
