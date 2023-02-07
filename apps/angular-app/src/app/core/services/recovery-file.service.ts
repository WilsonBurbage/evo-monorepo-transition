import { EvoFile } from '../models/evo-file.model';

export class RecoveryFileService {
  static async saveRecoveryFile(evoFile: EvoFile): Promise<string> {
    await window.bridge.commands.purgeTimestampedFolder(
      this.recoveryFolderPath(),
      499,
    );

    return window.bridge.commands.saveFile(
      this.recoveryFilePath(),
      JSON.stringify(evoFile),
      [],
    );
  }

  static recoveryFolderPath(): string {
    return `${window.bridge.constants.machineDetails.evoDocumentsDirectory}\\recovery\\`;
  }

  static recoveryFilePath(): string {
    const fileName = `${new Date().getTime()}.evo`;

    return `${this.recoveryFolderPath()}\\${fileName}`;
  }
}
