import React, { useState, useContext } from 'react';
import { View, Alert, StyleSheet, Text, Image, ImageBackground } from 'react-native'; 
import Input from '../components/Input';
import CustomButton from '../components/Button';
import AuthContext from '../context/AuthContext';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingrese el email y la contraseña');
      return;
    }

    try {
      console.log("Intentando iniciar sesión...");
      await login(email, password);
    } catch (error) {
      setErrorMessage('Credenciales incorrectas');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image 
          source={require('../../assets/images/iconosinculpafondonegroredondeado.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
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

        {errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  logo: {
    width: 150,
    height: 150, 
    marginBottom: 30,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
