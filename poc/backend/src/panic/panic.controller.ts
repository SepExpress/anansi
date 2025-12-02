import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { WsGateway } from '../ws/ws.gateway';

@Controller('panic')
export class PanicController {
  constructor(private prisma: PrismaService, private gateway: WsGateway) {}

  @Post()
  async trigger(@Body() body: { deviceId: string; userId: string; lat: number; lng: number }) {
    const alert = await this.prisma.alert.create({
      data: { type: 'PANIC', deviceId: body.deviceId, userId: body.userId, lat: body.lat, lng: body.lng },
    });
    this.gateway.broadcastPanic(alert);
    return { ok: true, alertId: alert.id };
  }
}
