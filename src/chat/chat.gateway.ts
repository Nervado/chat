import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  users: number = 0;

  async handleConnection() {
    // A client has connected
    this.users++;

    //Notify connected clients of current users
    this.server.emit('users', this.users);
    console.log('New client connected');
  }

  async handleDisconnect() {
    // A client has disconnected
    this.users--;

    //Notify connected clients of current users
    this.server.emit('users', this.users);
    console.log('...client disconnected');
  }

  @SubscribeMessage('chat')
  async onChat(client, message) {
    client.broadcast.emit('chat', message);
  }
}
