import { MenuItemConstructorOptions } from 'electron';
import { MenuItemId } from '../models/menu-item-id.model';

export class MenuService {
  static acceleratorCtrl = 'CommandOrControl';

  static fileMenuTemplate: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          id: MenuItemId.new,
          accelerator: `${MenuService.acceleratorCtrl}+N`,
        },
        { type: 'separator' },
        {
          label: 'Open...',
          id: MenuItemId.open,
          accelerator: `${MenuService.acceleratorCtrl}+O`,
        },
        { label: 'Open example', id: MenuItemId.openExample },
        { label: 'Open as template...', id: MenuItemId.openAsTemplate },
        { type: 'separator' },
        {
          label: 'Save',
          id: MenuItemId.save,
          accelerator: `${MenuService.acceleratorCtrl}+S`,
        },
        { label: 'Save as...', id: MenuItemId.saveAs },
        { type: 'separator' },
        {
          label: 'Export...',
          id: MenuItemId.export,
          accelerator: `${MenuService.acceleratorCtrl}+E`,
        },
        { type: 'separator' },
        { label: 'Log out', id: MenuItemId.logOut },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
  ];

  static developerMenuTemplate: MenuItemConstructorOptions[] = [
    {
      label: 'Developer',
      submenu: [
        { label: 'Save state and reload', id: MenuItemId.saveStateAndReload },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { label: 'Save diagnostics...', id: MenuItemId.saveDiagnostics },
      ],
    },
  ];

  static async setAuthenticatedMenu(): Promise<void> {
    window.bridge.commands.setMenu([
      ...this.fileMenuTemplate,
      ...this.developerMenuTemplate,
    ]);
  }

  static async setDeauthenticatedMenu(): Promise<void> {
    window.bridge.commands.setMenu([...this.developerMenuTemplate]);
  }
}
