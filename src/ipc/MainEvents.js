const { ipcMain } = require('electron');
const packageJson = require('../../package.json');

let handlers = [];

function onGetVersion(event) {
  event.returnValue = packageJson.version;
}

function onGetWindow(event) {
  const url = event.sender.history[0];
  const senderName = url.split('/')[url.split('/').length - 1];
  event.returnValue = senderName;
}

/**
 * Initialize Main events
 * @param {{string,BrowserWindow[]}} windows - { name, window object }
 */
function initMainEvents() {
  if (handlers.length) {
    return;
  }

  ipcMain.on('get-package-version', onGetVersion);

  ipcMain.on('get-window', onGetWindow);
}

/**
 * Remove Main events
 */
function removeMainEvents() {
  if (handlers.length) {
    handlers = handlers.map((action) => {
      ipcMain.removeAllListeners(action);
      return null;
    });
  }
}

module.exports = {
  initMainEvents,
  removeMainEvents,
};
