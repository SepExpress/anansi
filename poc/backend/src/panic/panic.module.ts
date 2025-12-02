import { Module } from '@nestjs/common';
import { PanicController } from './panic.controller';
import { PrismaService } from '../common/prisma.service';
import { WsGateway } from '../ws/ws.gateway';

@Module({
  controllers: [PanicController],
  providers: [PrismaService, WsGateway],
})
export class PanicModule {}
