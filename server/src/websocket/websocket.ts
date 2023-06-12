import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class BoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected');
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('createBoard')
  handleCreateBoard(client: Socket, data: any) {
    console.log('Create Board:', data);

    // Board Create 로직을 수행하고 결과를 클라이언트에 전송할 수 있습니다.
    // 예를 들어, Board를 데이터베이스에 저장하고 생성된 Board 정보를 클라이언트에 전송할 수 있습니다.
  }
}
