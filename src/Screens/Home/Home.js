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

  
        <Text style={styles.buttonText}>Ir a Nuevo Post</Text>

      <Text style={styles.posteos}>Posteos</Text>
            <FlatList
              data={posteos}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.textocard}>{item.data.descripcion}</Text>
                  <Text>Likes: {item.data.likes.length}</Text>

                  <Pressable onPress={() => darLike(item.id)}>
                     <Text>Me gusta</Text>
                  </Pressable>

                  <Pressable onPress={() => disLike(item.id)}>
                     <Text>No me gusta</Text>
                  </Pressable>

                  <Pressable onPress={() => props.navigation.navigate('Comentarios', { id: item.id })}>
                      <Text>Comentar</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 24,
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
});