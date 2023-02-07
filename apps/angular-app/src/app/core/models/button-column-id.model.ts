import { FontAwesomeIcon } from './font-awesome-icon.model';

export enum ButtonColumnId {
  delete = 'delete',
}

export const BUTTON_COLUMN_ID_ICON_MAP: {
  [key in ButtonColumnId]: FontAwesomeIcon;
} = {
  [ButtonColumnId.delete]: FontAwesomeIcon.trash,
};
