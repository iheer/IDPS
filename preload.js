const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('backend', {
  readJSON: (filename) => {
    const fullPath = path.join(__dirname, 'output', filename);
    try {
      const data = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON:', error);
      return null;
    }
  }
});
