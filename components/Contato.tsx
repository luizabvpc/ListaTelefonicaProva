import { SQLiteDatabase } from "expo-sqlite"
import _contato from "../types/contato"
import { Button, Text, View } from "react-native"
import {Linking} from 'react-native' 

type _propsContato = {
    dados: _contato,
    db: SQLiteDatabase,
    recarregar: any
}

export default function Contato(props: _propsContato){
    const excluir = async()=>{
        await props.db.runAsync("DELETE FROM contatos WHERE id=?", props.dados.id);
        await props.recarregar();
    }
    const ligar = async()=>{
        //Linking.openURL(`tel:${phoneNumber}`)
    }
    return <View>
        <Text>{props.dados.nome}</Text>
        <Button title="Ligar" onPress={ligar} />
    </View>;
}