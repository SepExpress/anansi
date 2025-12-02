type Point = { lat: number; lng: number };

type HeatCell = { geohash: string; count: number };

const geohash = (p: Point) => `${p.lat.toFixed(2)}_${p.lng.toFixed(2)}`;

export function buildHeatmap(points: Point[]): HeatCell[] {
  const buckets: Record<string, number> = {};
  points.forEach((p) => {
    const cell = geohash(p);
    buckets[cell] = (buckets[cell] || 0) + 1;
  });
  return Object.entries(buckets).map(([key, count]) => ({ geohash: key, count }));
}

export function movingAverage(values: number[], window = 3) {
  const result: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const slice = values.slice(Math.max(0, i - window + 1), i + 1);
    result.push(slice.reduce((a, b) => a + b, 0) / slice.length);
  }
  return result;
}
