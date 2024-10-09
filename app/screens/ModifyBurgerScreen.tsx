import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AuthContext from '../context/AuthContext'; 

const ModifyBurgerScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { id } = route.params; 
  const [nombre, setNombre] = useState('');
  const [valor, setValor] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const { token } = useContext(AuthContext); 

  useEffect(() => {

    const fetchHamburguesa = async () => {
      try {
        const response = await axios.get(`http://192.168.100.45:8080/api/hamburguesas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Hamburguesa actualizada con éxito');
      navigation.goBack(); 
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
