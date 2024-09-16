import React, { useState, useContext } from 'react';
import { View, Alert, StyleSheet, Text } from 'react-native'; // Asegúrate de que 'Text' esté importado
import Input from '../components/Input';
import CustomButton from '../components/Button';
import AuthContext from '../context/AuthContext';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Manejo del mensaje de error

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingrese el email y la contraseña');
      return;
    }

    try {
      console.log("Intentando iniciar sesión..."); // Debug
      await login(email, password); // Asegúrate de que login esté bien definido en AuthContext
    } catch (error) {
      setErrorMessage('Credenciales incorrectas'); // Actualiza el estado del mensaje de error
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <CustomButton title="Iniciar Sesión" onPress={handleLogin} />

      {/* Muestra el mensaje de error si existe */}
      {errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text> // Uso de <Text> para mostrar el mensaje de error
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
