import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectedCounter, Counter } from '../type/counter.dto';
import { CounterService } from '../../../modules/master/counter/service/counter.service';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsGuard } from '../../../guards/ws-guard/ws.guard';
import { WsExceptionFilter } from '../../../filters/ws-exception/ws-exception.filter';

@UseGuards(WsGuard)
@UseFilters(WsExceptionFilter)
@WebSocketGateway(Number(process.env.APP_WS_PORT) || 3002, {
  namespace: 'counter',
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  },
})
export class CounterGateway {
  @WebSocketServer() server: Server;
  counterUsed: ConnectedCounter[] = [];

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
      this.server.emit(`counter-type-${counter?.counter_type}`, {
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
    this.server.emit(`counter-type-${counter_type}`, {
      data: counters,
    });
  }

  @SubscribeMessage('connect-counter')
  async handleCounterConnection(client: Socket, payload: ConnectedCounter) {
    if (this.findCounter(payload.counter_id)) {
      throw new WsException('Loket telah digunakan');
    }
    if (isNaN(Number(payload.counter_type))) {
      throw new WsException('Jenis loket tidak valid');
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
    const currentCounter = this.findCurrentCounterData(
      payload.counter_id,
      counters,
    );
    this.server.emit(`counter-type-${payload.counter_type}`, {
      data: counters,
    });
    this.server.emit(`counter-id-${payload.counter_id}`, {
      data: currentCounter,
    });
  }

  findCurrentCounterData(counterId: number, counters: Counter[]) {
    return counters.find(
      (counter: Counter) => counter.id_ms_loket_antrian === counterId,
    );
  }

  findCounter(counterId: number) {
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
