const { build } = require('electron-builder');
const path = require('path');

build({
  config: {
    appId: 'com.idps.app',
    productName: 'IDPS App',
    directories: {
      output: 'release',
      buildResources: 'assets',
    },
    files: [
      'dist/**/*',
      'electron/**/*',
    ],
    win: {
      target: 'nsis',
      icon: 'assets/icon.ico',
    },
    mac: {
      target: 'dmg',
      icon: 'assets/icon.icns',
    },
    linux: {
      target: 'AppImage',
      icon: 'assets/icon.png',
    },
    nsis: {
      oneClick: false,
      allowToChangeInstallationDirectory: true,
      createDesktopShortcut: true,
      createStartMenuShortcut: true,
    },
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
}); 