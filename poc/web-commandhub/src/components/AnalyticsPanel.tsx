import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from 'recharts';

export const AnalyticsPanel: React.FC = () => {
  const [summary, setSummary] = useState<any | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/analytics/summary').then((r) => r.json()).then(setSummary);
  }, []);

  if (!summary) return <div style={{ padding: 12 }}>Loading analytics...</div>;

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
      <h3>Analytics</h3>
      <p>Hijackings (24h/7d/30d): {summary.hijackings.last24h} / {summary.hijackings.last7d} / {summary.hijackings.last30d}</p>
      <p>Recovery time avg: {summary.recoveryTimeAvgMinutes} minutes</p>
      <p>Predicted peak hour: {summary.predictedPeakHour}:00 | Route risk score: {summary.routeRiskScore}/100</p>
      <AreaChart width={520} height={200} data={summary.densityByHour}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="incidents" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
};
