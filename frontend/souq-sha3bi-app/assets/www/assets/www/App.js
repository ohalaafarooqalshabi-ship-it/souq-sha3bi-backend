import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

export default function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    axios.get('https://souq-sha3bi-backend-2.onrender.com')
      .then(res => setMessage(res.data || 'Connected!'))
      .catch(err => setMessage('Error connecting to server'));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{message}</Text>
    </View>
  );
}
