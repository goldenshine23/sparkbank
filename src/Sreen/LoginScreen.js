import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { api, setAuthToken } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { username, password });
      const token = res.data.token;
      setAuthToken(token);
      login(token, username);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
