import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import * as Location from 'expo-location';
import io from 'socket.io-client';

interface Incident {
  id: string;
  title: string;
  status?: string;
  lat?: number;
  lng?: number;
}

export default function HomeScreen({ navigation, token }: any) {
  const [onDuty, setOnDuty] = useState(true);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    socket.on('incident_update', (incident: Incident) => {
      setIncidents((prev) => {
        const found = prev.find((i) => i.id === incident.id);
        if (found) return prev.map((i) => (i.id === incident.id ? { ...i, ...incident } : i));
        return [incident, ...prev];
      });
    });
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (!onDuty) return;
    let timer: any;
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      timer = setInterval(async () => {
        const pos = await Location.getCurrentPositionAsync({});
        await fetch('http://localhost:4000/tracking/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ lat: pos.coords.latitude, lng: pos.coords.longitude, deviceId: 'demo-device' }),
        });
      }, 7000);
    })();
    return () => clearInterval(timer);
  }, [onDuty, token]);

  useEffect(() => {
    fetch('http://localhost:4000/incidents').then((r) => r.json()).then(setIncidents);
  }, []);

  const triggerPanic = async () => {
    await fetch('http://localhost:4000/panic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ deviceId: 'demo-device', userId: 'field-ops-user', lat: 0, lng: 0 }),
    });
    Alert.alert('Panic alert sent');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FieldOps On-Duty</Text>
        <View style={styles.toggleRow}>
          <Text>On Duty</Text>
          <Switch value={onDuty} onValueChange={setOnDuty} />
        </View>
      </View>
      <FlatList
        data={incidents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('IncidentDetail', { incident: item })}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>Status: {item.status || 'REPORTED'}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Hold for Panic" onLongPress={triggerPanic} color="#b00020" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
});
