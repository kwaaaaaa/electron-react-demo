const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

function initAutoUpdater(win) {
  autoUpdater.autoDownload = false;

  // set the time in "hour:minute" format
  let timeToRun = "12:00";

  // initialize scheduler
  let scheduler = schedulerFunction();

  win.webContents.once("dom-ready", () => {
    scheduler.executeAt(timeToRun, () => {
      autoUpdater.checkForUpdatesAndNotify();
    });
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
    // do not fire this to not disturb users
    // this should be fired when user manually checks for update 
    return;

    dialog
      .showMessageBox({
        title: "No Updates",
        message: "Current version is up-to-date."
      });
  });

  autoUpdater.on("download-progress", progress => {
    // track progress here, e.g. send it to renderer
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

  // dispose auto update check timer
  win.on("closed", () => {
    scheduler.destroy();
  });
}

/**
 * Closure function to encapsulate own lifecycle methods 
 */
function schedulerFunction() {
  timerHandle = undefined;

  /**
  * This Method executes a function certain time of the day
  */
  function executeAt(time, callback) {
    // get hour and minute from hour:minute param received, ex.: "16:00"
    const hour = Number(time.split(":")[0]);
    const minute = Number(time.split(":")[1]);

    // create a Date object at the desired timepoint
    const startTime = new Date();
    startTime.setHours(hour, minute);

    const now = new Date();

    // increase timepoint by 24 hours if in the past
    if (startTime.getTime() < now.getTime()) {
      startTime.setHours(startTime.getHours() + 24);
    }

    // get the interval in ms from now to the timepoint when to trigger
    const firstTriggerAfterMs = startTime.getTime() - now.getTime();

    // trigger callback at the timepoint
    timerHandle = setTimeout(() => {
      callback();

      // create setInterval when the timepoint is reached to trigger it every day at this timepoint
      timerHandle = setInterval(callback, 24 * 60 * 60 * 1000);
    }, firstTriggerAfterMs);
  }

  function destroy() {
    if (timerHandle)
      clearTimeout(timerHandle);
  }

  return {
    executeAt,
    destroy
  };
}

module.exports = {
  initAutoUpdater
};
