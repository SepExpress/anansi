import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { LiveMap } from '../components/LiveMap';
import { IncidentFeed } from '../components/IncidentFeed';
import { AnalyticsPanel } from '../components/AnalyticsPanel';

export default function Dashboard() {
  const [panic, setPanic] = useState<any | null>(null);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    socket.on('incident_update', (incident) => setIncidents((prev) => [incident, ...prev].slice(0, 50)));
    socket.on('location_update', (ping) => setUnits((prev) => [ping, ...prev].slice(0, 50)));
    socket.on('panic_alert', setPanic);
    return () => socket.disconnect();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, padding: 16 }}>
      {panic && <div style={{ background: '#ffcccb', padding: 12, borderRadius: 6 }}>Panic alert from {panic.deviceId}</div>}
      <div>
        <LiveMap incidents={incidents} units={units} />
        <AnalyticsPanel />
      </div>
      <IncidentFeed incidents={incidents} />
    </div>
  );
}
