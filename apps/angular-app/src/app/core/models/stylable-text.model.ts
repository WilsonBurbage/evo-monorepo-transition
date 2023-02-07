import { Alignment } from './alignment.model';

export interface StylableText {
  text?: string;
  alignment?: Alignment;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
}
