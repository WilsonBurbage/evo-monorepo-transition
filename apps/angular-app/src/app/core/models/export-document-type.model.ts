import { PreviewPadding } from './preview-padding.model';
import { PreviewSetup } from './preview-setup.model';

export enum ExportDocumentType {
  frontSheet = 'frontSheet',
  bill = 'bill',
  schedules = 'schedules',
  certificates = 'certificates',
  backSheet = 'backSheet',
}

export const EXPORT_DOCUMENT_TYPE_NAMES_SENTENCE_CASE_MAP: {
  [key in ExportDocumentType]: string;
} = {
  [ExportDocumentType.frontSheet]: 'Front sheet',
  [ExportDocumentType.backSheet]: 'Back sheet',
  [ExportDocumentType.bill]: 'Bill',
  [ExportDocumentType.schedules]: 'Schedules',
  [ExportDocumentType.certificates]: 'Certificates',
};

export const EXPORT_DOCUMENT_TYPE_NAMES_LOWER_CASE_MAP: {
  [key in ExportDocumentType]: string;
} = {
  [ExportDocumentType.frontSheet]: 'front sheet',
  [ExportDocumentType.backSheet]: 'back sheet',
  [ExportDocumentType.bill]: 'bill',
  [ExportDocumentType.schedules]: 'schedules',
  [ExportDocumentType.certificates]: 'certificates',
};

export const EXPORT_DOCUMENT_TYPE_PREVIEW_SETUPS_MAP: {
  [key in ExportDocumentType]: PreviewSetup;
} = {
  [ExportDocumentType.frontSheet]: {
    lined: false,
    padding: PreviewPadding.two,
  },
  [ExportDocumentType.backSheet]: { lined: false, padding: PreviewPadding.two },
  [ExportDocumentType.bill]: { lined: true, padding: PreviewPadding.one },
  [ExportDocumentType.schedules]: { lined: false, padding: PreviewPadding.two },
  [ExportDocumentType.certificates]: {
    lined: false,
    padding: PreviewPadding.two,
  },
};
