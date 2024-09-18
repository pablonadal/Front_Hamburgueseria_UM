import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
import * as Print from 'expo-print'; // Para generar PDFs
import * as FileSystem from 'expo-file-system'; // Para gestionar archivos
import * as Sharing from 'expo-sharing'; // Para compartir archivos

interface Hamburguesa {
  id: number;
  nombre: string;
  valor: number;
  ingredientes: string;
}

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [hamburguesas, setHamburguesas] = useState<Hamburguesa[]>([]);
  const { token, logout } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchHamburguesas();
      }
    }, [token])
  );

  const fetchHamburguesas = async () => {
    try {
      const response = await axios.get('http://192.168.100.45:8080/api/hamburguesas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHamburguesas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para generar y compartir el PDF usando expo-print y expo-sharing
  const generatePdf = async (hamburguesa: Hamburguesa) => {
    try {
      const htmlContent = `
        <h1>Ticket de Hamburguesa</h1>
        <p><strong>Nombre:</strong> ${hamburguesa.nombre}</p>
        <p><strong>Valor:</strong> ${hamburguesa.valor}</p>
        <p><strong>Ingredientes:</strong> ${hamburguesa.ingredientes}</p>
      `;

      // Generar el PDF usando expo-print
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Definir la ubicación de destino donde se guardará el archivo
      const destinationUri = `${FileSystem.documentDirectory}ticket_hamburguesa_${hamburguesa.id}.pdf`;

      // Mover el archivo desde el directorio temporal a una ubicación permanente
      await FileSystem.moveAsync({
        from: uri,
        to: destinationUri,
      });

      // Verificar si el dispositivo permite compartir archivos
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'El dispositivo no soporta la funcionalidad de compartir archivos.');
        return;
      }

      // Compartir el archivo PDF
      await Sharing.shareAsync(destinationUri);

    } catch (error) {
      console.error('Error al generar el PDF:', error);
      Alert.alert('Error', 'No se pudo generar el PDF');
    }
  };

  const modificarHamburguesa = (id: number) => {
    navigation.navigate('ModificarHamburguesa', { id });
  };

  const imprimirTicket = async (hamburguesa: Hamburguesa) => {
    await generatePdf(hamburguesa); // Llamamos a la función para generar y compartir el PDF
  };

  const renderHamburguesa = ({ item }: { item: Hamburguesa }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text>Valor: {item.valor}</Text>
      <Text>Ingredientes: {item.ingredientes}</Text>
      <Button title="Modificar" onPress={() => modificarHamburguesa(item.id)} />
      <Button title="Imprimir Ticket" onPress={() => imprimirTicket(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hamburguesas}
        renderItem={renderHamburguesa}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Cerrar Sesión" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
    padding: 10,
  },
  card: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
