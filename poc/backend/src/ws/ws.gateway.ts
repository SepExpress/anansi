import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WsGateway {
  @WebSocketServer()
  server: Server;

  broadcastLocation(ping: any) {
    this.server?.emit('location_update', ping);
  }

  broadcastIncidentUpdate(incident: any) {
    this.server?.emit('incident_update', incident);
  }

  broadcastPanic(alert: any) {
    this.server?.emit('panic_alert', alert);
  }
}
