import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import * as path from 'path';
import { bridge } from './bridge/bridge';

declare global {
  // eslint-disable-next-line no-var
  var mainWindow: BrowserWindow;
  // eslint-disable-next-line no-var
  var quitAuthorised: boolean;
}

const createMainWindow = (): void => {
  globalThis.mainWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    minWidth: 1300,
    minHeight: 620,
    webPreferences: {
      sandbox: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  Object.values(bridge.handlers).forEach((handler) => handler(ipcMain));

  globalThis.mainWindow.loadURL('http://localhost:4200');

  installExtension(REDUX_DEVTOOLS, {
    loadExtensionOptions: { allowFileAccess: true },
  })
    .then((name) => console.log(`Added extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  globalThis.mainWindow.webContents.openDevTools();

  globalThis.mainWindow.on('close', (e) => {
    if (!globalThis.quitAuthorised) {
      e.preventDefault();
      globalThis.mainWindow.webContents.executeJavaScript(
        `electronQuitAppAttempted()`,
      );
    }
  });
};

app.on('ready', createMainWindow);

app.on('window-all-closed', function () {
  app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createMainWindow();
});
