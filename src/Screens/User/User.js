import { StyleSheet, Text, View, Pressable } from 'react-native';
import { auth, db } from "../../Firebase/Config";
import { FlatList } from 'react-native-web';
import { useState, useEffect } from 'react';

function User({ navigation }) {
  const user = auth.currentUser;
  const [username, setUsername] = useState("");
  const [posteos, setPosteos] = useState([]);


  useEffect(() => {
    db.collection("users")
      .where("email", "==", user.email)

      .onSnapshot(docs => { docs.forEach(doc => {
          setUsername(doc.data().username);
        });
      });

    
    db.collection("posts")
      .where("owner", "==", user.email)
      .onSnapshot(docs => {
        let misPosteos = [];
        docs.forEach(doc => {
          misPosteos.push({ id: doc.id, data: doc.data() });
        });
        setPosteos(misPosteos);
      });
  }, []);

  function logout() {
    auth.signOut()
      .then(() => {
        navigation.navigate('Login');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Nombre de usuario: {username}</Text>
      <Text style={styles.subtitle}>Email: {user.email}</Text>

      <Text style={styles.posteos}>Mis posteos</Text>
      <FlatList
        data={posteos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.textocard}>{item.data.descripcion}</Text>
          </View>
        )}
      />

      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Desloguearse</Text>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#E24A4A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default User;