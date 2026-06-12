import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de inicio</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('NuevoPost')}
      >
        <Text style={styles.buttonText}>Ir a Nuevo Post</Text>
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
});