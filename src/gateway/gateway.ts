//import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({ cors: { origin: ['http://localhost:3000'] } })
export class MyGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
  //   onModuleInit() {
  //     if (this.server) {
  //       this.server.on('connection', (socket) => {
  //         console.log(socket.id);
  //         console.log('connected');
  //       });
  //     } else {
  //       console.error('WebSocket server is not set.');
  //     }
  //   }
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    //emit msg to event
    this.server.emit('onMessage', {
      msg: 'new Message',
      content: body,
    });
  }
  @SubscribeMessage('events')
  handleEvent(client: Socket, data: string): string {
    return data;
  }
}
