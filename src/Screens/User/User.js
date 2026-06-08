import { StyleSheet, Text, View, Pressable } from 'react-native';
import { auth } from "../../Firebase/Config";

function User({ navigation }) {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Email: {user.email}</Text>

      <Pressable style={styles.button} onPress={() => {
        auth.signOut();
        navigation.navigate('Login');
      }}>
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
});

export default User;