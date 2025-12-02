import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { WsGateway } from '../ws/ws.gateway';

class PingDto {
  deviceId: string;
  lat: number;
  lng: number;
  speed?: number;
  heading?: number;
}

@Controller('tracking')
export class TrackingController {
  constructor(private prisma: PrismaService, private gateway: WsGateway) {}

  @Post('ping')
  async ping(@Body() body: PingDto) {
    const ping = await this.prisma.locationPing.create({ data: body });
    this.gateway.broadcastLocation(ping);
    return ping;
  }
}
