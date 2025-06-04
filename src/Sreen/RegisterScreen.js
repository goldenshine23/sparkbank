import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { api } from '../api/api';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { fullName, username, password });
      navigation.navigate('Login');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Full Name" onChangeText={setFullName} />
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
