import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../../Firebase/Config';
import firebase from 'firebase';


function Comentarios(props) {
  const {id} = props.route.params;
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {

  db.collection("posts")
    .onSnapshot(docs => {

      docs.forEach(doc => {

        if (doc.id === id) {

          setComentarios(
            doc.data().comentarios
              ? doc.data().comentarios
              : []
          );

        }
    });
});

}, []);

  function onSubmit() {
    db.collection('posts')
      .doc(id)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          comentario: comentario,
          owner: auth.currentUser.email,
        })
      })
      .then(() => {
        setComentario("");
      })
      .catch(error => console.error(error));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.posteos}>Comentarios</Text>

      <FlatList
        data={comentarios}
        keyExtractor={item => item.comentario}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.accionTexto}>{item.owner}</Text>
            <Text style={styles.textocard}>{item.comentario}</Text>
          </View>
        )}
      />

      <TextInput
        placeholder="Agregá un comentario..."
        value={comentario}
        onChangeText={text => setComentario(text)}
        style={styles.input}
      />

      <Pressable onPress={() => onSubmit()} style={styles.button}>
        <Text style={styles.buttonText}>Comentar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 56,
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#F0EEFF',
    fontWeight: '700',
  },
    posteos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },
  textocard: {
    color: '#444',
    fontSize: 14,
  },

  accion: {
    marginTop: 6,
  },
  accionTexto: {
    color: '#888',
    fontWeight: '600',
    fontSize: 13,
  },
  comentar: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 13,
    marginTop: 6,
  },
  input: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 14,
  borderWidth: 1,
  borderColor: '#ddd',
  marginTop: 16,
  marginBottom: 10,
},
});

export default Comentarios;