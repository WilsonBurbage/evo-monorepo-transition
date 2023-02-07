export interface DocumentExportConfig {
  targetFolderPath: string;

  frontSheet: boolean;
  bill: boolean;
  schedules: boolean;
  certificates: boolean;
  backSheet: boolean;
}
