const { app } = require('electron');
const createWindow = require('./window');
const events = require('./src/ipc/MainEvents');

let mainWindow;

app.on('ready', () => {
  mainWindow = createWindow();
  events.initMainEvents();
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
