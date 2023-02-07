import { BaseEntity } from '@evo-monorepo/shared';

export interface TextReplacement extends BaseEntity {
  input: string;
  output: string;
}
