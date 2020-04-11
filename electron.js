const { app } = require('electron');
const createWindow = require('./window');
const autoUpdate = require('./auto-update');
const events = require('./src/ipc/MainEvents');

let mainWindow;

app.on('ready', () => {
  mainWindow = createWindow();
  events.initMainEvents();
  autoUpdate.initAutoUpdater(mainWindow);
});

app.on('window-all-closed', () => {
  events.removeMainEvents();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});
