import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps { 
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,     
  autoCapitalize  
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}        
    autoCapitalize={autoCapitalize}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    borderRadius: 25, 
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff', 
  },
});

export default Input;
