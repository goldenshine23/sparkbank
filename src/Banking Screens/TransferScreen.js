import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { api } from '../api/api';

export default function TransferScreen({ navigation }) {
  const [toAccountNumber, setToAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    try {
      await api.post(`/account/transfer?toAccountNumber=${toAccountNumber}&amount=${amount}`);
      alert('Transfer successful');
      navigation.goBack();
    } catch {
      alert('Transfer failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Recipient Account Number"
        onChangeText={setToAccountNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        onChangeText={setAmount}
        style={styles.input}
      />
      <Button title="Send" onPress={handleTransfer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
});
