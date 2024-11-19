type User = {
  client_id?: string;
  user_id: number;
};

type ConnectedCounter = {
  client_id: string;
  user_id: number;
  counter_type: number;
  counter_id: number;
  id_queue_called?: number;
};

type Counter = {
  id_ms_loket_antrian: number;
  nama_loket: string;
  jenis_loket: number;
  is_used?: boolean;
  user?: User;
};

export type { Counter, User, ConnectedCounter };
