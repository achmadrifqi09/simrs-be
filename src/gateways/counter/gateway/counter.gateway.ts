import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectedCounter, Counter } from '../types/counter.dto';
import { CounterService } from '../../../modules/master/counter/service/counter.service';

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  },
})
export class CounterGateway {
  @WebSocketServer() server: Server;
  private counterUsed: ConnectedCounter[] = [];

  constructor(private readonly counterService: CounterService) {}

  async handleConnection(client: Socket) {
    client.on('disconnecting', async () => {
      const counterIndex = this.findIndex(client.id);
      const counter: ConnectedCounter = this.counterUsed[counterIndex];

      if (!counter) {
        return;
      }
      delete this.counterUsed[counterIndex];
      const activeCounters = await this.counterService.findActiveCounterByType(
        counter.counter_type,
      );
      const mappedCounters = this.mappingCounter(activeCounters);
      this.server.emit(`counter-${counter?.counter_type}`, {
        data: mappedCounters,
      });
    });
  }

  @SubscribeMessage('counter')
  async handleCounterObservable(
    @MessageBody('counter_type') counter_type: number,
  ) {
    let counters =
      await this.counterService.findActiveCounterByType(counter_type);
    counters = this.mappingCounter(counters);
    this.server.emit(`counter-${counter_type}`, {
      data: counters,
    });
  }

  @SubscribeMessage('connect-counter')
  async handleCounterConnection(client: Socket, payload: ConnectedCounter) {
    if (this.findCounter(payload.counter_id)) {
      throw new WsException('Loket telah digunakan');
    }

    if (this.findUser(payload.user_id)) {
      throw new WsException('Anda telah terhubung di loket lain');
    }

    this.counterUsed.push({
      client_id: client.id,
      ...payload,
    });
    const updatedCounters = await this.counterService.findActiveCounterByType(
      payload.counter_type,
    );
    const counters = this.mappingCounter(updatedCounters);
    this.server.emit(`counter-${payload.counter_type}`, {
      data: counters,
    });
  }

  private findCounter(counterId: number) {
    return this.counterUsed.find(
      (counter) => counter?.counter_id === counterId,
    );
  }

  private findUser(userId: number) {
    return this.counterUsed.find((counter) => counter?.user_id === userId);
  }

  private mappingCounter(counters: Counter[]) {
    return counters.map((counter: Counter) => {
      return {
        is_used: !!this.findCounter(counter.id_ms_loket_antrian),
        ...counter,
      };
    });
  }

  private findIndex(clientId: string) {
    return this.counterUsed.findIndex(
      (counter) => counter?.client_id === clientId,
    );
  }
}
