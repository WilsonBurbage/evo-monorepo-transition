import { DIAGNOSTICS_FILE_TYPES } from '@evo-monorepo/shared';
import { Diagnostics } from '../models/diagnostics.model';

export class DiagnosticsService {
  static async saveDiagnostics(diagnostics: Diagnostics): Promise<string> {
    return await window.bridge.commands.saveFile(
      '',
      JSON.stringify(diagnostics),
      DIAGNOSTICS_FILE_TYPES
    );
  }
}
