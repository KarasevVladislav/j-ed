export type Chunk = {
  index: number;
  data: Json[];
  parsed?: boolean;
}

export type Json = Record<string, JsonEntry>;

export enum JsonEntryType {
  ID = 'id',
  STRING = 'string',
  NUMBER = 'number',
  EMAIL = 'email',
  DATE = 'date',
  BOOLEAN = 'boolean',
  LONG_TEXT = 'long_text',
  INVALID = 'invalid',
}

export type JsonEntry = {
  type: JsonEntryType;
  value: unknown;
}
