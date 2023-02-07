import { FileData } from '@evo-monorepo/shared';
import { dialog, IpcMain, IpcMainInvokeEvent } from 'electron';
import * as fs from 'fs';
import { BridgeCommands } from './../../core/models/bridge-commands.enum';

export const openFile = <T>(
  filePath: string,
  fileTypes: Electron.FileFilter[]
): FileData<T> | undefined => {
  const filePathToUse =
    filePath ||
    (dialog.showOpenDialogSync(globalThis.mainWindow, {
      properties: ['openFile'],
      filters: fileTypes,
    }) || [])[0];

  if (!filePathToUse) {
    return undefined;
  }

  if (!fs.existsSync(filePathToUse)) {
    return undefined;
  }

  const data: T = JSON.parse(fs.readFileSync(filePathToUse, 'utf8'));

  return {
    filePath: filePathToUse,
    data,
  };
};

export const handleOpenFile = (ipcMain: IpcMain): void => {
  ipcMain.handle(
    BridgeCommands.openFile,
    (
      _event: IpcMainInvokeEvent,
      filePath: string,
      fileTypes: Electron.FileFilter[]
    ) => openFile(filePath, fileTypes)
  );
};
