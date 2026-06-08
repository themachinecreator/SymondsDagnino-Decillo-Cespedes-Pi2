import { StyleSheet, Text, View, Pressable } from 'react-native';
import { auth, db } from "../../Firebase/Config";
import { useEffect } from 'react';

function User({ navigation }) {
  useEffect(function(){
    db.collection("User").where("Loguser", "==", auth.currentUser.email).onSnapshot(
      docs=>{
        let info = "";
        docs.forEach(doc=>{
          posts.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            info:email,
            loanding: false
          })
        })


      }
    )
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.title}>email:{info}</Text>
      
      <Text style={styles.subtitle}>Navegación cruzada a Login:</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
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
    fontSize: 10,
    color: '#999',
    marginBottom: 6,
    textAlign: 'center',
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
});

export default User