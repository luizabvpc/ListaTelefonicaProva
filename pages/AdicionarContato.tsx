import { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("lista-telefonica-prova.sqlite");

export default function AdicionarContato({ navigation }) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    const adicionar = async () => {
        if (nome == "" || telefone== "") {
            Alert.alert("Atenção", "O nome e o telefone são obrigatórios.");
            return;
        }

        await db.runAsync(`INSERT INTO contatos (nome, telefone) VALUES (?, ?)`, [nome, telefone]);
        
        navigation.navigate('ListaContatos');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Adicionar Novo Contato</Text>

            <View style={styles.texto}>
                <Text style={styles.txt}>Nome do Contato</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Ex: Maria'
                    value={nome}
                    onChangeText={setNome}
                />
            </View>

            <View style={styles.texto}>
                <Text style={styles.txt}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Ex:999998888'
                    value={telefone}
                    onChangeText={setTelefone}
                />
            </View>

            <TouchableOpacity style={styles.botao} onPress={adicionar}>
                <Text style={styles.textoBotao}>Salvar Contato</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFE0', 
        padding: 20,
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 30,
        paddingTop: 15,
    },
    texto: {
        marginBottom: 20,
    },
    txt: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#C71585',
        paddingLeft: 10,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
    },
    botao: {
        backgroundColor: '#C71585', 
        padding: 18,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        width: '60%',
        alignSelf: 'center',
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});