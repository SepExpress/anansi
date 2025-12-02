import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const statusFlow = ['ACCEPTED', 'EN_ROUTE', 'ON_SCENE', 'CLOSED'];

export default function IncidentDetailScreen({ route, token }: any) {
  const { incident } = route.params;
  const [statusIdx, setStatusIdx] = useState(0);
  const [note, setNote] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const advanceStatus = async () => {
    const nextStatus = statusFlow[statusIdx];
    await fetch(`http://localhost:4000/incidents/${incident.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: nextStatus, userId: 'field-ops-user' }),
    });
    setStatusIdx((idx) => Math.min(idx + 1, statusFlow.length - 1));
  };

  const mockUploadPhoto = () => {
    setPhotoUri('https://placekitten.com/300/200');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{incident.title}</Text>
      <MapView style={styles.map} initialRegion={{ latitude: incident.lat || 0, longitude: incident.lng || 0, latitudeDelta: 0.05, longitudeDelta: 0.05 }}>
        <Marker coordinate={{ latitude: incident.lat || 0, longitude: incident.lng || 0 }} />
      </MapView>
      <Text>Status: {statusFlow[statusIdx]}</Text>
      <Button title="Advance Status" onPress={advanceStatus} />
      <TextInput style={styles.input} placeholder="Add note" value={note} onChangeText={setNote} />
      <Button title="Attach Note" onPress={() => console.log('note', note)} />
      <Button title="Attach Photo" onPress={mockUploadPhoto} />
      {photoUri && <Image source={{ uri: photoUri }} style={{ height: 120, marginTop: 8 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  map: { height: 200, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 8 },
});
