import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IncidentsService } from './incidents.service';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidents: IncidentsService) {}

  @Get()
  list(@Query('userId') userId?: string, @Query('lat') lat?: string, @Query('lng') lng?: string) {
    if (userId) return this.incidents.listAssigned(userId);
    if (lat && lng) return this.incidents.listNearby(Number(lat), Number(lng));
    return this.incidents.listNearby(0, 0);
  }

  @Post()
  create(@Body() body: any) {
    return this.incidents.create(body);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string; userId: string }) {
    return this.incidents.updateStatus(id, body.status, body.userId);
  }
}
