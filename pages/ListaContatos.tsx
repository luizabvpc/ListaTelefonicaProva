import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import _contato from '../types/contato';
import Contato from '../components/Contato';
import { FAB } from '@rneui/themed';

const db = SQLite.openDatabaseSync("lista-telefonica-prova.sqlite");

export default function ListaContatos({ navigation }) {
    const [contatos, setContatos] = useState<_contato[]>([]);
    const [busca, setBusca] = useState('');
    const [visible, setVisible] = React.useState(true);

    useEffect(() => {
        db.execSync(`CREATE TABLE IF NOT EXISTS contatos (
            id INTEGER PRIMARY KEY NOT NULL,
            nome VARCHAR(100),
            telefone VARCHAR(100)
        )`);
        recarregar();
    }, []);

    useEffect(() => {
        recarregar();
    }, [busca]);

    const recarregar = async () => {
        const temp: _contato[] = await db.getAllAsync(
            "SELECT * FROM contatos WHERE nome LIKE ? ORDER BY nome ASC",
            [`%${busca}%`]
        );
        setContatos(temp);
    }

    const renderLista = () => {
        let contato = contatos.map(c =>
            <Contato
                dados={c}
                db={db}
                recarregar={recarregar}
                key={c.id}
                navigation={navigation}
            />
        );
        return contato;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.texto}>Lista Telefonica</Text>
            <TextInput
                style={styles.busca}
                placeholder="Buscar contato"
                value={busca}
                onChangeText={setBusca}
            />
            <ScrollView style={styles.lista}>
                {renderLista()}
            </ScrollView>
            <FAB
                style={styles.fab}
                visible={visible}
                icon={{ name: 'add', color: 'white' }}
                color='#C71585'
                onPress={() => navigation.navigate('AdicionarContato')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    busca: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
    },
    texto: {
        paddingTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFE0', // 🎨 Fundo amarelo claro
    },
    lista: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});