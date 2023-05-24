import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  
  // api.post('/api/authentication/login', {
  //   email: 'test1@gmail.com',
  //   password: 'password'
  // })
  //   .then((response) => {
  //     // Обробка відповіді
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     // Обробка помилки
  //     console.error(error);
  //   });
 
  

  const handleLogin = () => {
    // Реалізуйте логіку перевірки облікових даних тут
    axios.post('http://fasunok.loc/api/authentication/login', {
      email: email,
      password: password
    })
      .then((response) => {
        // Обробка відповіді
        console.log(response.data);
      })
      .catch((error) => {
        // Обробка помилки
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ім'я користувача"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Увійти" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;