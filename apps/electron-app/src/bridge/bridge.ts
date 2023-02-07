import { DocxExportData } from '@evo-monorepo/shared';
import { ipcRenderer, MenuItemConstructorOptions } from 'electron';
import { BridgeCommands } from './../core/models/bridge-commands.enum';
import { BridgeConstants } from './../core/models/bridge-constants.enum';
import { Bridge } from './../core/models/bridge.model';
import { handleCheckFileExists } from './commands/check-file-exists';
import { handleExportDocx } from './commands/export-docx';
import { handleOpenFile } from './commands/open-file';
import { handlePurgeTimestampedFolder } from './commands/purge-timestamped-folder';
import { handleQuitApp } from './commands/quit-app';
import { handleReload } from './commands/reload';
import { handleSaveFile } from './commands/save-file';
import { handleSelectFolder } from './commands/select-folder';
import { handleSetMenu } from './commands/set-menu';
import { frameworkDetails } from './constants/framework-details';
import { machineDetails } from './constants/machine-details';

export const bridge: Bridge = {
  commands: {
    [BridgeCommands.checkFileExists]: (filePath: string) =>
      ipcRenderer.invoke(BridgeCommands.checkFileExists, filePath),

    [BridgeCommands.exportDocx]: (
      targetFileName: string,
      targetFolderPath: string,
      templateName: string,
      data: DocxExportData
    ) =>
      ipcRenderer.invoke(
        BridgeCommands.exportDocx,
        targetFileName,
        targetFolderPath,
        templateName,
        data
      ),

    [BridgeCommands.openFile]: (
      filePath: string,
      fileTypes: Electron.FileFilter[]
    ) => ipcRenderer.invoke(BridgeCommands.openFile, filePath, fileTypes),

    [BridgeCommands.purgeTimestampedFolder]: (
      folderPath: string,
      numberOfItemsToKeep: number
    ) =>
      ipcRenderer.invoke(
        BridgeCommands.purgeTimestampedFolder,
        folderPath,
        numberOfItemsToKeep
      ),

    [BridgeCommands.quitApp]: () => ipcRenderer.invoke(BridgeCommands.quitApp),

    [BridgeCommands.reload]: () => ipcRenderer.invoke(BridgeCommands.reload),

    [BridgeCommands.saveFile]: (
      filePath: string,
      data: string,
      fileTypes: Electron.FileFilter[]
    ) => ipcRenderer.invoke(BridgeCommands.saveFile, filePath, data, fileTypes),

    [BridgeCommands.selectFolder]: () =>
      ipcRenderer.invoke(BridgeCommands.selectFolder),

    [BridgeCommands.setMenu]: (template: MenuItemConstructorOptions[]) =>
      ipcRenderer.invoke(BridgeCommands.setMenu, template),
  },
  handlers: {
    [BridgeCommands.checkFileExists]: handleCheckFileExists,
    [BridgeCommands.exportDocx]: handleExportDocx,
    [BridgeCommands.openFile]: handleOpenFile,
    [BridgeCommands.purgeTimestampedFolder]: handlePurgeTimestampedFolder,
    [BridgeCommands.quitApp]: handleQuitApp,
    [BridgeCommands.reload]: handleReload,
    [BridgeCommands.saveFile]: handleSaveFile,
    [BridgeCommands.selectFolder]: handleSelectFolder,
    [BridgeCommands.setMenu]: handleSetMenu,
  },
  constants: {
    [BridgeConstants.frameworkDetails]: frameworkDetails,
    [BridgeConstants.machineDetails]: machineDetails,
  },
};
