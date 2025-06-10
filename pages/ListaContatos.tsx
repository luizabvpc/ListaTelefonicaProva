import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import _contato from '../types/contato';
import Contato from '../components/Contato';

const db = SQLite.openDatabaseSync("lista-telefonica-prova.sqlite");

export default function ListaContatos({navigation}){
    const [novoContato, setNovoContato] = useState<string>('');
    const [contatos, setContatos] = useState<_contato[]>([]);

    useEffect(
    () => {
      db.execSync(`CREATE TABLE IF NOT EXISTS constatos (
              id INTEGER PRIMARY KEY NOT NULL,
              nome VARCHAR(100),
              telefone VARCHAR(100)
        )`);
        recarregar();
    }
  , []);

    const recarregar = async () => {
        let temp : _contato[] = await db.getAllAsync("SELECT * FROM contatos ORDER BY nome ASC");
        setContatos(temp);
    }

    return <></>;
}