import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { api } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function DashboardScreen({ navigation }) {
  const [account, setAccount] = useState(null);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await api.get('/account/me');
        setAccount(res.data);
      } catch {
        alert('Error loading account');
      }
    };
    fetchAccount();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {user}</Text>
      {account ? (
        <>
          <Text>Account Number: {account.accountNumber}</Text>
          <Text>Balance: ₦{account.balance.toFixed(2)}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.buttonGroup}>
        <Button title="Transfer Funds" onPress={() => navigation.navigate('Transfer')} />
        <Button title="Transaction History" onPress={() => navigation.navigate('Transactions')} />
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  buttonGroup: { marginTop: 20, gap: 10 },
});
