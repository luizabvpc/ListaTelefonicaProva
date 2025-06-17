import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("lista-telefonica-prova.sqlite");

export default function EditarContato({ route, navigation }) {
    const { contato } = route.params;

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        if (contato?.id) {
            setNome(contato.nome);
            setTelefone(contato.telefone);
        }
    }, [contato?.id]); 

    const editar = async () => {
        if (nome == "" || telefone == "") {
            Alert.alert("Atenção", "O nome e o telefone são obrigatórios.");
            return;
        }

        await db.runAsync(
            `UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?`,
            [nome, telefone, contato.id]
        );

        navigation.navigate('ListaContatos');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Editar Contato</Text>

            <View style={styles.texto}>
                <Text style={styles.txt}>Nome do Contato</Text>
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                />
            </View>

            <View style={styles.texto}>
                <Text style={styles.txt}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                />
            </View>

            <TouchableOpacity style={styles.botao} onPress={editar}>
                <Text style={styles.textoBotao}>Salvar Alterações</Text>
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
        fontWeight: 'bold',
        color: '#800080',
        marginBottom: 8,
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
        backgroundColor: '#800080', 
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