// eslint-disable-next-line @typescript-eslint/no-var-requires
const Docxtemplater = require('docxtemplater');

import { DocxExportData } from '@evo-monorepo/shared';
import { IpcMain, IpcMainInvokeEvent } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import { BridgeCommands } from './../../core/models/bridge-commands.enum';

export const exportDocx = (
  targetFileName: string,
  targetFolderPath: string,
  templateName: string,
  data: DocxExportData
): boolean => {
  const filePathToUse = path.join(targetFolderPath, `${targetFileName}.docx`);

  console.log(path.resolve('./'));

  const content = fs.readFileSync(
    `./apps/electron-app/src/assets/word-templates/${templateName}.docx`,
    'binary'
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: (): string => {
      return '';
    },
  });

  doc.render(data);

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });

  try {
    fs.writeFileSync(filePathToUse, buf);

    return true;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const handleExportDocx = (ipcMain: IpcMain): void => {
  ipcMain.handle(
    BridgeCommands.exportDocx,
    (
      _event: IpcMainInvokeEvent,
      targetFileName: string,
      targetFolderPath: string,
      templateName: string,
      data: DocxExportData
    ) => exportDocx(targetFileName, targetFolderPath, templateName, data)
  );
};
