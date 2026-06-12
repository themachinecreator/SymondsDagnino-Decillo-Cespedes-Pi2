import {db, auth} from "../../Firebase/Config";
import { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput } from "react-native";

function Posteos() {

    function Posteos() {
    const [posteos, setPosteos] = useState([]); 
    const [loading, setLoading] = useState(true);

    db.collection("posts").add({
        descripcion: setPosteos,
        owner: auth.currentUser.email,
        setPosteos: "descripcion del post",
        createdAt: Date.now(),
        likes: []
    })

        .then(() => {
            console.log("Post creado");
            setLoading("");
            props.navigation.navigate("HomeMenu");
        })
        .catch((error) => console.error("Error al crear el post:"));
    }
  return (
    <View style={styles.container}>
      <Text style={styles.subtite}> Nuevo Posteo </Text>

      <TextInput
        placeholder="Añadi tu posteo"
        value={setPosteos}
        onChangeText={text => setLoading(text)}
        style={styles.input}
      />

      <Pressable onPress={()=>crearPosteo()} style={styles.submit}>
        <Text style={styles.textoSubmit}>Subir</Text>
      </Pressable>

    </View>
  )
}

export default Posteos;