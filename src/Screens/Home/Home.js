import {Usestate} from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import firebase from 'firebase';
import { ActivityIndicator } from 'react-native-web';

function Home({navigation}) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de inicio (Home)</Text>
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
  },
});   
export default Home