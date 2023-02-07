import { IpcMain } from 'electron';
import { BridgeCommands } from './../../core/models/bridge-commands.enum';

export const reload = (): void => {
  globalThis.mainWindow.webContents.reloadIgnoringCache();
};

export const handleReload = (ipcMain: IpcMain): void => {
  ipcMain.handle(BridgeCommands.reload, () => reload());
};
