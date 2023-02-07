import { DocxExportData, FileData, TriStateResult } from '@evo-monorepo/shared';
import { IpcMain, MenuItemConstructorOptions } from 'electron';
import { BridgeCommands } from './bridge-commands.enum';
import { BridgeConstants } from './bridge-constants.enum';
import { FrameworkDetails } from './framework-details.model';
import { MachineDetails } from './machine-details.model';

export interface Bridge {
  commands: {
    [BridgeCommands.checkFileExists]: (filePath: string) => Promise<boolean>;
    [BridgeCommands.exportDocx]: (
      targetFileName: string,
      targetFolderPath: string,
      templateName: string,
      data: DocxExportData
    ) => Promise<TriStateResult>;
    [BridgeCommands.openFile]: <T>(
      filePath: string,
      fileTypes: Electron.FileFilter[]
    ) => Promise<FileData<T>>;
    [BridgeCommands.purgeTimestampedFolder]: (
      folderPath: string,
      numberOfItemsToKeep: number
    ) => Promise<boolean>;
    [BridgeCommands.quitApp]: () => Promise<void>;
    [BridgeCommands.reload]: () => Promise<void>;
    [BridgeCommands.saveFile]: (
      filePath: string,
      data: string,
      fileTypes: Electron.FileFilter[]
    ) => Promise<string>;
    [BridgeCommands.selectFolder]: () => Promise<string>;
    [BridgeCommands.setMenu]: (
      template: MenuItemConstructorOptions[]
    ) => Promise<void>;
  };
  handlers: {
    [BridgeCommands.checkFileExists]: (ipcMain: IpcMain) => void;
    [BridgeCommands.exportDocx]: (ipcMain: IpcMain) => void;
    [BridgeCommands.openFile]: (ipcMain: IpcMain) => void;
    [BridgeCommands.purgeTimestampedFolder]: (ipcMain: IpcMain) => void;
    [BridgeCommands.quitApp]: (ipcMain: IpcMain) => void;
    [BridgeCommands.reload]: (ipcMain: IpcMain) => void;
    [BridgeCommands.saveFile]: (ipcMain: IpcMain) => void;
    [BridgeCommands.selectFolder]: (ipcMain: IpcMain) => void;
    [BridgeCommands.setMenu]: (ipcMain: IpcMain) => void;
  };
  constants: {
    [BridgeConstants.frameworkDetails]: FrameworkDetails;
    [BridgeConstants.machineDetails]: MachineDetails;
  };
}
