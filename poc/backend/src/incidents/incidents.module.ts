import { Module } from '@nestjs/common';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';
import { PrismaService } from '../common/prisma.service';
import { WsGateway } from '../ws/ws.gateway';

@Module({
  controllers: [IncidentsController],
  providers: [IncidentsService, PrismaService, WsGateway],
  exports: [IncidentsService],
})
export class IncidentsModule {}
