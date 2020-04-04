const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const isDev = require('electron-is-dev');

function CreateWindow() {
  let win = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;
  if (isDev) {
    indexPath = `http://localhost:8080/#/home`;
  } else {
    const file = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'build', 'index.html#', 'home'),
      slashes: true,
    }).replace('%23', '#');
    indexPath = process.platform === 'win32'
      ? `${file.substring(0, file.lastIndexOf('\\'))}home`
      : file;
  }
  win.loadURL(indexPath);
  win.setFullScreen(!isDev);

  win.once('ready-to-show', () => {
    win.show();
    if (isDev) {
      win.webContents.openDevTools();
    }
  });

  win.on('closed', () => {
    win = null;
  });

  return win;
}
module.exports = CreateWindow;
