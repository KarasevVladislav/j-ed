export type Chunk = {
  index: number;
  data: Json[];
  parsed?: boolean;
}

export type Json = Record<string, JsonEntry>;

export type JsonEntry = {
  type: string;
  value: unknown;
}
