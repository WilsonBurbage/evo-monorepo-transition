import { app, IpcMain } from 'electron';
import { BridgeCommands } from './../../core/models/bridge-commands.enum';

export const quitApp = (): void => {
  globalThis.quitAuthorised = true;
  app.quit();
};

export const handleQuitApp = (ipcMain: IpcMain): void => {
  ipcMain.handle(BridgeCommands.quitApp, () => quitApp());
};
