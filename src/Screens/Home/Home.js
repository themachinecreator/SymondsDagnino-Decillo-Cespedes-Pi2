import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { db , auth } from '../../Firebase/Config';
import firebase from "firebase";



export default function Home({ navigation }) {
    
  const [posteos, setPosteos] = useState([]);

useEffect(() => {

    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot(docs => {
        let todosLosPosteos = [];

        docs.forEach(doc => {
          todosLosPosteos.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setPosteos(todosLosPosteos);
    });

}, []);


function darLike(idPost) {
    db.collection("posts")
      .doc(idPost)
      .update({
          likes: firebase.firestore.FieldValue.arrayUnion(
              auth.currentUser.email
          )
      })
}

function disLike(idPost) {
        db.collection("posts")
        .doc(idPost)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
}


return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de inicio</Text>
    

      <Text style={styles.subtitulo}>Posteos</Text>
      <FlatList
        data={posteos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <Text style={styles.emailtexto}>{item.data.owner}</Text>
            <Text style={styles.descripcionTexto}>{item.data.descripcion}</Text>
            <Text style={styles.likesTexto}>Likes: {item.data.likes.length}</Text>

            <Pressable onPress={() => darLike(item.id)} style={styles.botonAccion}>
              <Text style={styles.accionTexto}>Me gusta</Text>
            </Pressable>

            <Pressable onPress={() => disLike(item.id)} style={styles.botonAccion}>
              <Text style={styles.accionTexto}>No me gusta</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Comentarios', { id: item.id })}>
              <Text style={styles.comentarTexto}>Comentar</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

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
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 24,
    marginBottom: 12,
  },
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },
  emailtexto: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 6,
  },
  descripcionTexto: {
    color: '#444',
    fontSize: 14,
    marginBottom: 6,
  },
  likesTexto: {
    color: '#888',
    fontSize: 13,
    marginBottom: 6,
  },
  botonAccion: {
    marginTop: 6,
  },
  accionTexto: {
    color: '#888',
    fontWeight: '600',
    fontSize: 13,
  },
  comentarTexto: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 13,
    marginTop: 6,
  },
});