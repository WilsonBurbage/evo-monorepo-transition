import { FileData } from '@evo-monorepo/shared';
import { EvoSettings } from '../models/evo-settings.model';

export class EvoSettingsService {
  static async openEvoSettings(): Promise<FileData<EvoSettings> | undefined> {
    const fileData = await window.bridge.commands.openFile<EvoSettings>(
      this.evoSettingsFilePath(),
      []
    );

    if (fileData) {
      return fileData;
    }

    return undefined;
  }

  static async saveEvoSettings(evoSettings: EvoSettings): Promise<string> {
    return await window.bridge.commands.saveFile(
      this.evoSettingsFilePath(),
      JSON.stringify(evoSettings),
      []
    );
  }

  static evoSettingsFilePath(): string {
    return `${window.bridge.constants.machineDetails.evoDocumentsDirectory}\\evo-settings.json`;
  }
}
