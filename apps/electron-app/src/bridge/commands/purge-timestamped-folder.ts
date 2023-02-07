import { IpcMain, IpcMainInvokeEvent } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { BridgeCommands } from './../../core/models/bridge-commands.enum';

export const purgeTimestampedFolder = (
  folderPath: string,
  numberOfItemsToKeep: number,
): boolean => {
  if (!fs.existsSync(folderPath)) {
    return false;
  }

  const fileNames = fs.readdirSync(folderPath);

  fileNames.sort().reverse();

  fileNames.splice(0, numberOfItemsToKeep);

  fileNames.forEach((fileName) => fs.rmSync(path.join(folderPath, fileName)));

  return true;
};

export const handlePurgeTimestampedFolder = (ipcMain: IpcMain): void => {
  ipcMain.handle(
    BridgeCommands.purgeTimestampedFolder,
    (
      _event: IpcMainInvokeEvent,
      filePath: string,
      numberOfItemsToKeep: number,
    ) => purgeTimestampedFolder(filePath, numberOfItemsToKeep),
  );
};
