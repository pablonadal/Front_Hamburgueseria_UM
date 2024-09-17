import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect
import AuthContext from '../context/AuthContext';

interface Hamburguesa {
  id: number;
  nombre: string;
  valor: number;
  ingredientes: string;
}

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [hamburguesas, setHamburguesas] = useState<Hamburguesa[]>([]);
  const { token, logout } = useContext(AuthContext);

  // Reemplazamos useEffect por useFocusEffect
  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchHamburguesas(); // Recargar hamburguesas cada vez que la pantalla gane foco
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

  const modificarHamburguesa = (id: number) => {
    navigation.navigate('ModificarHamburguesa', { id }); // Navegamos a la pantalla de modificación
  };

  const imprimirTicket = (id: number) => {
    console.log(`Imprimir ticket para hamburguesa con ID: ${id}`);
  };

  const renderHamburguesa = ({ item }: { item: Hamburguesa }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text>Valor: {item.valor}</Text>
      <Text>Ingredientes: {item.ingredientes}</Text>
      <Button title="Modificar" onPress={() => modificarHamburguesa(item.id)} />
      <Button title="Imprimir Ticket" onPress={() => imprimirTicket(item.id)} />
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
