const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

function initAutoUpdater(win) {
  autoUpdater.autoDownload = false;

  win.webContents.once("dom-ready", () => {
    autoUpdater.checkForUpdatesAndNotify();
    //autoUpdater.checkForUpdates();
  });

  autoUpdater.on("error", (error) => {
    dialog.showErrorBox("Error: ", error == null ? "unknown" : (error.stack || error).toString());
  });

  autoUpdater.on("update-available", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Found Updates",
        message: "Found updates, do you want update now?",
        buttons: ["Sure", "No"]
      })
      .then(res => {
        if (res.response === 0) {
          autoUpdater.downloadUpdate();
          return;
        }
      });
  });

  autoUpdater.on("update-not-available", () => {
    //if (!updater)
    //  return;

    dialog
      .showMessageBox({
        title: "No Updates",
        message: "Current version is up-to-date."
      });
  });

  autoUpdater.on("download-progress", progress => {
    //track progress here, e.g. send it to renderer
    //win.webContents.send("updater:download-progress", progress.percent);
  });

  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox({
        title: "Install Updates",
        message: "Updates downloaded, application will now quit for update..."
      })
      .then(() => {
        setImmediate(() => autoUpdater.quitAndInstall());
      });
  });
}

module.exports = {
  initAutoUpdater
};
