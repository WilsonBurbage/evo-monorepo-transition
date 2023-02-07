import { contextBridge } from 'electron';
import { bridge } from './bridge/bridge';

contextBridge.exposeInMainWorld('bridge', bridge);
