import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import {db, auth} from "../../Firebase/Config";


function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [register, setRegister] = useState(false);
  const [reistererror, setRegisterError] = useState("");
  function onSubmit(username,email,password){
    auth.createUserWithEmailAndPassword(email,password)
    .then(response =>{
      db.collection("users").add({
        email: auth.currentUser.email,
        username: username,
        createAt: Date.now(),
      })
      .then(response =>{setRegister(true) 
        navigation.navigate('Login')})
    })
    .catch(error => {setRegisterError("fallo en el registro.")})
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder='Email'
        placeholderTextColor="#999"
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        keyboardType='default'
        placeholder='Password'
        placeholderTextColor="#999"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        keyboardType='default'
        placeholder='Username'
        placeholderTextColor="#999"
        onChangeText={text => setUsername(text)}
        value={username}
      />

      <Pressable style={styles.button} onPress={() => onSubmit(username,email, password)}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>  

      <Pressable style={styles.link} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Ya tengo cuenta</Text>
      </Pressable>
    </View>
  );
}

export default Register