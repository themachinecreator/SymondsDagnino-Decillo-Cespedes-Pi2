import { StyleSheet, Text, View, Pressable } from 'react-native';
import { auth } from "../../Firebase/Config";

function User({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Esta es la pantalla del perfil del usuario.</Text>
      <Text style={styles.subtitle}>Navegación cruzada a Login:</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Desloguearse</Text>
      </Pressable>
    </View>
  );
}

export default User