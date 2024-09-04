import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

interface Hamburguesa {
    id: number;
    nombre: string;
    valor: number;
    ingredientes: string;
}

const App: React.FC = () => {
    const [hamburguesas, setHamburguesas] = useState<Hamburguesa[]>([]);

    useEffect(() => {
        fetchHamburguesas();
    }, []);

    const fetchHamburguesas = async () => {
        try {
            const response = await axios.get('http://192.168.100.45:8080/api/hamburguesas');
            setHamburguesas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const modificarHamburguesa = (id: number) => {
        // Lógica para modificar la hamburguesa
        console.log(`Modificar hamburguesa con ID: ${id}`);
    };

    const imprimirTicket = (id: number) => {
        // Lógica para imprimir el ticket
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

export default App;
