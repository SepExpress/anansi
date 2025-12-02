import React from 'react';

type Props = { incidents: any[]; units: any[] };

export const LiveMap: React.FC<Props> = ({ incidents, units }) => (
  <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 12 }}>
    <h3>Live Map (mock)</h3>
    <p>Incidents plotted: {incidents.length}</p>
    <p>Units tracked: {units.length}</p>
    <div style={{ background: '#f5f5f5', height: 220, borderRadius: 6, display: 'grid', placeItems: 'center' }}>
      Mapbox/Google Maps placeholder
    </div>
  </div>
);
