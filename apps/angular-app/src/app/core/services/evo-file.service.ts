import { EVO_FILE_TYPES, FileData } from '@evo-monorepo/shared';
import { EvoFile } from '../models/evo-file.model';

export class EvoFileService {
  static async openEvoFile(): Promise<FileData<EvoFile> | undefined> {
    const fileData = await window.bridge.commands.openFile<EvoFile>(
      '',
      EVO_FILE_TYPES
    );

    if (fileData) {
      return fileData;
    }

    return undefined;
  }

  static async saveEvoFile(
    filePath: string,
    evoFile: EvoFile
  ): Promise<string> {
    return await window.bridge.commands.saveFile(
      filePath,
      JSON.stringify(evoFile, null, 4),
      EVO_FILE_TYPES
    );
  }
}
