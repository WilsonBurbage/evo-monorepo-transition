import { CryptoService } from '@evo-monorepo/shared';
import { machineIdSync } from 'node-machine-id';
import * as os from 'os';
import { MachineDetails } from './../../core/models/machine-details.model';

const loadedMachineId = machineIdSync();

const machineId = CryptoService.hash(loadedMachineId);

export const machineDetails: MachineDetails = {
  evoDocumentsDirectory: `${os.homedir()}\\evo`,
  machineId,
  machineUsername: os.userInfo().username,
};
