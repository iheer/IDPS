const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // Load your Vercel app (replace with localhost in development)
  mainWindow.loadURL('https://threat-beacon-defense-net.vercel.app');

  // Open DevTools (optional)
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// Handle reports
ipcMain.on('save-report', (event, { content, fileName }) => {
  const { dialog } = require('electron');
  dialog.showSaveDialog({
    title: 'Save Report',
    defaultPath: fileName,
  }).then(({ filePath }) => {
    if (filePath) {
      const fs = require('fs');
      fs.writeFileSync(filePath, content);
    }
  });
});