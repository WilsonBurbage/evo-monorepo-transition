import { BaseEntity } from '@evo-monorepo/shared';
import { CoverSheetItemType } from './cover-sheet-item-type.model';
import { CoverSheetType } from './cover-sheet-type.model';
import { StylableText } from './stylable-text.model';

export interface CoverSheetItem extends BaseEntity, StylableText {
  coverSheetType: CoverSheetType;
  coverSheetItemType: CoverSheetItemType;
}
