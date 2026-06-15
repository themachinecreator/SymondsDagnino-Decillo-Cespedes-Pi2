import {db, auth} from "../../Firebase/Config";
import { useState} from 'react';
import { Text, View, Pressable, TextInput, StyleSheet } from "react-native";

function NuevoPost({navigation}) {

    const [descripcion, setDescripcion] = useState("");

    function onSubmit() {
        db.collection("posts").add({
        descripcion: descripcion,
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        likes: []
    })

        .then(() => {
            navigation.navigate("Home");
        })
        .catch((error) => console.error("Error al crear el post"));
}

return (
    <View style={styles.container}>
      <Text style={styles.subtite}> Nuevo Posteo </Text>

      <TextInput
        placeholder="Añadi tu posteo"
        value={descripcion}
        onChangeText={text => setDescripcion(text)}
        style={styles.input}
      />

      <Pressable onPress={()=>onSubmit()} style={styles.button}>
        <Text style={styles.textoSubmit}>Subir</Text>
      </Pressable>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 15,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  textoSubmit: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NuevoPost;