'use strict';

import { app, protocol, BrowserWindow, ipcMain, Tray, nativeImage, Menu } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
import path from 'path';
import log from 'electron-log';
import fs from 'fs';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

let win;

log.info('::::::START::::::');

/**
 * 프로그램에서 사용할 디렉토리
 */
let directoryPath;
// 프로그램 위치
let appPath;
let tryIconPath;

// 배포, 개발 빌드에 따라 현재 위치를 지정한다.
if (isDevelopment) {
  // 만약 개발 모드라면
  directoryPath = path.join(__dirname, '../');
  appPath = path.join(__dirname, '..');
  tryIconPath = path.join(__dirname, '../src/assets/icons/512x512.png');
} else {
  // 만약 배포 모드라면
  if (process.platform === 'win32') {
    tryIconPath = path.join('assets/icons/512x512.png');
    directoryPath = path.join(__dirname, '../../../../');

    /** 새로운 폴더 만들기 */
    const makeFoler = (dir) => {
      if (!fs.existsSync(dir)) {
        log.info('폴더를 생성합니다.\n * 생성 위치: ' + dir);
        fs.mkdirSync(dir);
      }
    };

    makeFoler(path.join(directoryPath, './token-briefing-client'));

    directoryPath = path.join(directoryPath, 'token-briefing-client');
    appPath = path.join(__dirname, '../..');
  } else {
    // MAC 단, 다른 운영체계 지원 시 꼭 추가 필요
    directoryPath = path.join(__dirname, '../../../../');
    appPath = path.join(__dirname, '..');
  }
}

// 현재 디렉토리에 대해 로그 생성
log.info('App run path (__dirname): ' + __dirname);
log.info('App setting path (directoryPath): ' + directoryPath);
log.info('Process ResourcesPath: ' + process.resourcesPath);
log.info('app start Path (appPath): ' + appPath);

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 830,
    height: 600,
    resizable: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
    icon: path.join(__dirname, 'assets/icons/png/icon.png'),
  });

  win.setMenuBarVisibility(false); //메뉴바 없애기

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', () => {
      // Someone tried to run a second instance, we should focus our window.
      if (win) {
        if (win.isMinimized() || !win.isVisible()) {
          win.show();
        }
        win.focus();
      }
    });
  }

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '열기',
      type: 'normal',
      click() {
        win.show();
      },
    },
    { label: '닫기', type: 'normal', role: 'quit' },
  ]);

  tray.on('click', () => win.show());
  tray.setContextMenu(contextMenu);
  win.on('close', (e) => {
    if (win.isVisible()) {
      win.hide();
      e.preventDefault();
    }
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

let tray = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  tray = new Tray(nativeImage.createFromPath(tryIconPath));
  tray.setToolTip('Token Briefing');

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

import ipcMapping from './electronbackend/electronIPC';
new ipcMapping(ipcMain, app, directoryPath, appPath);

// 작업표시줄 아이콘이 반응
ipcMain.on('win-highligth', () => {
  win.once('focus', () => win.flashFrame(false));
  return win.flashFrame(true);
});

ipcMain.on('win-show', () => {
  log.info('ipcMain win-show');
  win.show();
  win.focus();
});
