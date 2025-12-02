import React, { useEffect, useState } from 'react';

export const IncidentFeed: React.FC<{ incidents: any[] }> = ({ incidents }) => {
  const [filter, setFilter] = useState('ALL');
  const visible = filter === 'ALL' ? incidents : incidents.filter((i) => i.type === filter);
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
      <h3>Live Incident Feed</h3>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="ALL">All</option>
        <option value="HIJACKING">Hijacking</option>
        <option value="PATROL">Patrol</option>
      </select>
      <ul>
        {visible.map((incident) => (
          <li key={incident.id}>
            <strong>{incident.title}</strong> - {incident.status || 'REPORTED'}
          </li>
        ))}
      </ul>
    </div>
  );
};
