import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async summary() {
    const last24 = await this.prisma.incident.count({ where: { type: 'HIJACKING', createdAt: { gte: new Date(Date.now() - 24 * 3600 * 1000) } } });
    const last7d = await this.prisma.incident.count({ where: { type: 'HIJACKING', createdAt: { gte: new Date(Date.now() - 7 * 24 * 3600 * 1000) } } });
    const last30d = await this.prisma.incident.count({ where: { type: 'HIJACKING', createdAt: { gte: new Date(Date.now() - 30 * 24 * 3600 * 1000) } } });
    return {
      hijackings: { last24h: last24, last7d, last30d },
      recoveryTimeAvgMinutes: 42,
      densityByHour: Array.from({ length: 24 }).map((_, hour) => ({ hour, incidents: Math.floor(Math.random() * 5) })),
      typeDistribution: await this.prisma.incident.groupBy({ by: ['type'], _count: { _all: true } }),
      predictedPeakHour: 19,
      routeRiskScore: 68,
    };
  }

  async heatmap() {
    return Array.from({ length: 12 }).map((_, idx) => ({
      geohash: `dr${idx}xy`,
      intensity: Math.random(),
    }));
  }
}
