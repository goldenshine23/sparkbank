import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { api } from '../api/api';

export default function TransactionHistoryScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const res = await api.get('/account/transactions');
        setTransactions(res.data);
      } catch {
        alert('Error loading transactions');
      }
    };
    loadTransactions();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.txItem}>
      <Text style={styles.type}>{item.type}</Text>
      <Text>₦{item.amount.toFixed(2)}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 20 },
  txItem: { padding: 10, borderBottomWidth: 1 },
  type: { fontWeight: 'bold' },
  timestamp: { color: 'gray', fontSize: 12 },
});
