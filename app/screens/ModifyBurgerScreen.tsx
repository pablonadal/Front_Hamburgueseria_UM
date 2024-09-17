import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AuthContext from '../context/AuthContext'; // Importa el contexto para obtener el token

const ModifyBurgerScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { id } = route.params; // Obtener el ID de la hamburguesa que queremos modificar
  const [nombre, setNombre] = useState('');
  const [valor, setValor] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const { token } = useContext(AuthContext); // Obtener el token del contexto

  useEffect(() => {
    // Cargar los datos de la hamburguesa existente
    const fetchHamburguesa = async () => {
      try {
        const response = await axios.get(`http://192.168.100.45:8080/api/hamburguesas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
          },
        });
        const { nombre, valor, ingredientes } = response.data;
        setNombre(nombre);
        setValor(valor.toString());
        setIngredientes(ingredientes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHamburguesa();
  }, [id, token]);

  const handleSave = async () => {
    try {
      await axios.put(`http://192.168.100.45:8080/api/hamburguesas/${id}`, {
        nombre,
        valor: parseFloat(valor),
        ingredientes,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en la solicitud PUT
        },
      });
      alert('Hamburguesa actualizada con éxito');
      navigation.goBack(); // Volver a la pantalla anterior
    } catch (error) {
      console.error(error);
      alert('Hubo un error al actualizar la hamburguesa');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        keyboardType="numeric"
        onChangeText={setValor}
      />

      <Text style={styles.label}>Ingredientes</Text>
      <TextInput
        style={styles.input}
        value={ingredientes}
        onChangeText={setIngredientes}
      />

      <Button title="Guardar Cambios" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default ModifyBurgerScreen;
