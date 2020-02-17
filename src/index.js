const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
let win;
let tray = null;

function createWindow() {
  win = new BrowserWindow({
    width: 350,
    height: 125,
    fullscreenable: false,
    darkTheme: true,
    resizable: false,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    icon: 'assets/images/clock-small.png',
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('ready', () => {
  tray = new Tray('assets/images/clock-small.png');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Start',
      type: 'normal',
      click: () => {
        win.webContents.send('start');
      }
    }
  ]);
  tray.setToolTip('Metronome');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    if (win.isMinimized()) {
      win.restore();
    }
  });
});

ipcMain.on('start', () => {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Stop',
      type: 'normal',
      click: () => {
        win.webContents.send('stop');
      }
    }
  ]);
  tray.setContextMenu(contextMenu);
});

ipcMain.on('stop', () => {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Start',
      type: 'normal',
      click: () => {
        win.webContents.send('start');
      }
    }
  ]);
  tray.setContextMenu(contextMenu);
});
