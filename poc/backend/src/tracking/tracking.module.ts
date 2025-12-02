import { Module } from '@nestjs/common';
import { TrackingController } from './tracking.controller';
import { PrismaService } from '../common/prisma.service';
import { WsGateway } from '../ws/ws.gateway';

@Module({
  controllers: [TrackingController],
  providers: [PrismaService, WsGateway],
})
export class TrackingModule {}
