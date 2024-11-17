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
  metaData: {
    code: string;
    message: string;
  };
  response: string;
}
