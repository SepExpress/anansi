import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class IncidentsService {
  constructor(private prisma: PrismaService, private gateway: WsGateway) {}

  listAssigned(userId: string) {
    return this.prisma.incident.findMany({
      where: { assignedToId: userId },
      include: { asset: true, statuses: true },
    });
  }

  listNearby(lat: number, lng: number) {
    return this.prisma.incident.findMany({
      where: {},
      take: 20,
    });
  }

  async create(data: any) {
    const incident = await this.prisma.incident.create({ data });
    this.gateway.broadcastIncidentUpdate(incident);
    return incident;
  }

  async updateStatus(id: string, status: string, userId: string) {
    const statusHistory = await this.prisma.incidentStatusHistory.create({
      data: { incidentId: id, status, updatedById: userId },
    });
    this.gateway.broadcastIncidentUpdate({ id, status });
    return statusHistory;
  }
}
