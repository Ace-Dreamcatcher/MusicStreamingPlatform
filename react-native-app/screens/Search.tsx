import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from "../components/Theme";
import { useState } from 'react';


export default function Search() {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        console.log('Search text:', searchText);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Artists, albums, songs"
                onChangeText={setSearchText}
                value={searchText}
            />
            <TouchableOpacity onPress={handleSearch}>
                <Text style={styles.buttonText}>cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 70,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    buttonText: {
        marginLeft: 330,
        marginTop: -28,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#19bfb7',
    },
})
