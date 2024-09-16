import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = 'http://192.168.100.45:8080/api/auth/';

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(API_URL + 'login', { email, password });
    const token = response.data.token;
    // Guardar el token en AsyncStorage
    await AsyncStorage.setItem('token', token);
    return response.data;
  } catch (error: any) {
    console.error("Error en la autenticación:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export default {
  login,
};
