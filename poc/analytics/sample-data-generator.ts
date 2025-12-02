import { randomUUID } from 'crypto';

type Incident = { id: string; title: string; type: string; lat: number; lng: number; createdAt: Date };
type Officer = { id: string; name: string; trail: { lat: number; lng: number; t: Date }[] };

type Cluster = { lat: number; lng: number };

const clusters: Cluster[] = Array.from({ length: 5 }).map(() => ({
  lat: -26.2 + Math.random() * 0.2,
  lng: 28.0 + Math.random() * 0.2,
}));

const randomFromCluster = () => {
  const cluster = clusters[Math.floor(Math.random() * clusters.length)];
  return {
    lat: cluster.lat + (Math.random() - 0.5) * 0.05,
    lng: cluster.lng + (Math.random() - 0.5) * 0.05,
  };
};

const incidents: Incident[] = Array.from({ length: 220 }).map((_, idx) => {
  const coords = randomFromCluster();
  return {
    id: randomUUID(),
    title: `Hijacking #${idx + 1}`,
    type: 'HIJACKING',
    ...coords,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 3600 * 1000),
  };
});

const officers: Officer[] = Array.from({ length: 30 }).map((_, idx) => {
  const base = randomFromCluster();
  const trail = Array.from({ length: 12 }).map((__, t) => ({
    lat: base.lat + (Math.random() - 0.5) * 0.01,
    lng: base.lng + (Math.random() - 0.5) * 0.01,
    t: new Date(Date.now() - t * 3600 * 1000),
  }));
  return { id: randomUUID(), name: `Officer ${idx + 1}`, trail };
});

console.log(JSON.stringify({ incidents, officers, clusters }, null, 2));
