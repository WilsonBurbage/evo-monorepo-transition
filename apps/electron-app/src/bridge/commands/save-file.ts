import { dialog, IpcMain, IpcMainInvokeEvent } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { BridgeCommands } from './../../core/models/bridge-commands.enum';

export const saveFile = (
  filePath: string,
  data: string,
  fileTypes: Electron.FileFilter[],
): string => {
  const filePathToUse =
    filePath ||
    dialog.showSaveDialogSync(globalThis.mainWindow, { filters: fileTypes });

  if (!filePathToUse) {
    return '';
  }

  fs.mkdirSync(path.dirname(filePathToUse), { recursive: true });
  fs.writeFileSync(filePathToUse, data);

  return filePathToUse;
};

export const handleSaveFile = (ipcMain: IpcMain): void => {
  ipcMain.handle(
    BridgeCommands.saveFile,
    (
      _event: IpcMainInvokeEvent,
      filePath: string,
      data: string,
      fileTypes: Electron.FileFilter[],
    ) => saveFile(filePath, data, fileTypes),
  );
};
