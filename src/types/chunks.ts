export type ProcessedJson = Record<string, JsonEntry>;

export type Chunks = Record<number, ProcessedJson[]>;

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
