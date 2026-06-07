import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import {db, auth} from "../../Firebase/Config";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loginerror, setLoginError] = useState("");
  function onSubmit(email,password){
     auth.signInWithEmailAndPassword(email,password)
     .then(response =>{
       setLogin(true)
       navigation.navigate('HomeMenu')
     })
     .catch(error => {setLoginError("credenciales invalidas.")})
    }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Login</Text>

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
      <Pressable style={styles.button} onPress={() => onSubmit(email, password)}>
        <Text style={styles.buttonText}>ingresar</Text>
      </Pressable> 
      <Pressable style={styles.link} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>Registrarse</Text>
      </Pressable>
    </View>
  );
}
export default Login