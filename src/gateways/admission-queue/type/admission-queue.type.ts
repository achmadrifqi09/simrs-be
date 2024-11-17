type CallQueueInitPayload = {
  counter_id: number;
  queue_code: string;
};

type CallingQueuePayload = {
  id_antrian: number;
  id_ms_loket_antrian: number;
  user_id: number;
};

export type { CallQueueInitPayload, CallingQueuePayload };
