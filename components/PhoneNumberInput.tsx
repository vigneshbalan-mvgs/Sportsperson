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
import PropTypes from "prop-types"; // For prop validation

const colors = {
  textPrimary: "#000", // Fallback color if not defined in constants
};

const PhoneNumberInput = ({
  placeholder = "Enter phone number",
  value,
  onChangeText,
  style,
  ...props
}) => {
  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <CountryPicker
        countryCode={countryCode}
        withCallingCode
        withFlag
        withFilter
        withAlphaFilter
        onSelect={onSelect}
      />
      <Text style={styles.callingCode}>+{callingCode}</Text>
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

PhoneNumberInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  callingCode: {
    fontSize: 16,
    marginLeft: 10,
    color: colors.textPrimary,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    padding: 5,
  },
});

export default PhoneNumberInput;
