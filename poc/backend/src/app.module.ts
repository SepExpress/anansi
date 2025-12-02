import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IncidentsModule } from './incidents/incidents.module';
import { TrackingModule } from './tracking/tracking.module';
import { PanicModule } from './panic/panic.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PrismaService } from './common/prisma.service';
import { WsGateway } from './ws/ws.gateway';

@Module({
  imports: [AuthModule, IncidentsModule, TrackingModule, PanicModule, AnalyticsModule],
  providers: [PrismaService, WsGateway],
})
export class AppModule {}
