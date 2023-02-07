import { IpcMain, IpcMainInvokeEvent } from 'electron';
import * as fs from 'fs';
import { BridgeCommands } from './../../core/models/bridge-commands.enum';

export const checkFileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};

export const handleCheckFileExists = (ipcMain: IpcMain): void => {
  ipcMain.handle(
    BridgeCommands.checkFileExists,
    (_event: IpcMainInvokeEvent, filePath: string) => checkFileExists(filePath),
  );
};
