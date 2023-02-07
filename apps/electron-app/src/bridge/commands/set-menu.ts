import {
  IpcMain,
  IpcMainInvokeEvent,
  Menu,
  MenuItemConstructorOptions,
} from 'electron';
import { BridgeCommands } from './../../core/models/bridge-commands.enum';

export const setMenu = (template: MenuItemConstructorOptions[]): void => {
  const getIdsFromTemplateItems = (
    items: MenuItemConstructorOptions[],
  ): string[] => {
    const idsAtThisLevel = items.map((item) => item.id || '');

    const idsOfChildren = items
      .map((item) => {
        return getIdsFromTemplateItems(
          (item.submenu as MenuItemConstructorOptions[]) || [],
        );
      })
      .flat();

    const result = [...idsAtThisLevel, ...idsOfChildren].filter((id) => id);

    return result;
  };

  const allIds = getIdsFromTemplateItems(template);

  const menu = Menu.buildFromTemplate(template);

  allIds.forEach((id) => {
    const menuItem = menu.getMenuItemById(id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuItem!.click = (): Promise<any> =>
      globalThis.mainWindow.webContents.executeJavaScript(
        `menuItemClicked("${menuItem!.id}")`,
      );
  });

  Menu.setApplicationMenu(menu);
};

export const handleSetMenu = (ipcMain: IpcMain): void => {
  ipcMain.handle(
    BridgeCommands.setMenu,
    (_event: IpcMainInvokeEvent, template: MenuItemConstructorOptions[]) =>
      setMenu(template),
  );
};
