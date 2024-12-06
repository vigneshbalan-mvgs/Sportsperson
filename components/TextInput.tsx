import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { colors, fontSizes, spacing, br, bw } from "../const/colors";
import constStyles from "../const/Styles";

interface ITextInput {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: any;
  error?: string;
  editable?: boolean; // Added editable prop
}

const TextInputComponent: React.FC<ITextInput> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
  error,
  editable = true, // Default to true if not provided
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          constStyles.inputField,
          isFocused && constStyles.inputFieldFocused,
          error && constStyles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={editable} // Pass editable prop to TextInput
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: fontSizes.md,
    marginBottom: spacing.sm,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: colors.text,
    borderWidth: bw.default,
    borderRadius: br.default,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    fontSize: fontSizes.sm,
    color: colors.error,
    marginTop: spacing.sm,
  },
});

export default TextInputComponent;
