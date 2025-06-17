import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import _contato from "../types/contato";

type _propsContato = {
    dados: _contato,
    db: SQLiteDatabase,
    recarregar: any,
    navigation: any,
}

export default function Contato(props: _propsContato) {
    const excluir = async () => {
        await props.db.runAsync("DELETE FROM contatos WHERE id=?", props.dados.id);
        await props.recarregar();
    }

    const ligar = async () => {
        const num = props.dados.telefone;
        Linking.openURL(`tel:${num}`);
    }

    const editar = async () => {
        await props.navigation.navigate('EditarContato', { contato: props.dados });
    }

    return (
        <View style={styles.contato}>
            <Text style={styles.nome}>{props.dados.nome}</Text>
            <Text style={styles.telefone}>{props.dados.telefone}</Text>
            <View style={styles.botoes}>
                <TouchableOpacity style={styles.botaoLigar} onPress={ligar}>
                    <Text style={styles.botaoTexto}>Ligar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoEditar} onPress={editar}>
                    <Text style={styles.botaoTexto}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.botao, styles.botaoExcluir]} onPress={excluir}>
                    <Text style={styles.botaoTexto}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contato: {
        backgroundColor: '#F0E68C', // 🎨 Fundo amarelo mais escuro
        padding: 15,
        borderRadius: 10,
        marginBottom: 12, // Gap coerente entre os itens
        elevation: 2, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    telefone: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15, // Espaço entre o telefone e os botões
    },
    botoes: {
        flexDirection: 'row', // Organiza os botões um ao lado do outro
        justifyContent: 'space-around', // Distribui o espaço entre os botões
    },
    botaoLigar: {
        backgroundColor: '#66cc66', // 🎨 Cor rosa escuro para os botões
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    botaoEditar: {
        backgroundColor: '#800080', // 🎨 Cor rosa escuro para os botões
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
     botao: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    botaoTexto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    // Você pode opcionalmente dar uma cor diferente para o botão de excluir
    botaoExcluir: {
        backgroundColor: '#8B0000', // Um vermelho escuro para perigo
    }
});