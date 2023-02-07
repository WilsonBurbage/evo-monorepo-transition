// eslint-disable-next-line @typescript-eslint/no-var-requires
const Docxtemplater = require('docxtemplater');

import { dialog, IpcMain } from 'electron';
import { BridgeCommands } from './../../core/models/bridge-commands.enum';

export const selectFolder = (): string => {
  return (dialog.showOpenDialogSync(globalThis.mainWindow, {
    properties: ['openDirectory'],
  }) || [])[0];
};

export const handleSelectFolder = (ipcMain: IpcMain): void => {
  ipcMain.handle(BridgeCommands.selectFolder, () => selectFolder());
};
