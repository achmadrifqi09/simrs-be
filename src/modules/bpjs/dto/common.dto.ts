export interface BPJSHeader {
  'X-cons-id': string;
  'X-timestamp': string;
  'X-signature': string;
  user_key: string;
}

export interface Signature {
  code: string;
  timestamp: string;
}

export interface BPJSResponse {
  metadata: Metadata;
  metaData?: Metadata;
  response: string;
}

interface Metadata {
  code: string;
  message: string;
}
