import { FrameworkDetails } from './../../core/models/framework-details.model';

export const frameworkDetails: FrameworkDetails = {
  evo: { version: '1.0.0' },
  electron: { version: process.versions.electron },
  node: { version: process.versions.node },
  chrome: { version: process.versions.chrome },
};
