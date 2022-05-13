const path = require("path");
const { app, BrowserWindow, Tray } = require("electron");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let mainWindow;
let tray;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 600,
    frame: false,
    resizable: false,
  });
  mainWindow.loadURL("http://localhost:3000");
  // Icon
  const iconName =
    process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `../src/assets/${iconName}`);
  tray = new Tray(iconPath);
  tray.on("click", (event, bounds) => {
    const { x, y } = bounds;
    const { width, height } = mainWindow.getBounds();

    console.log(width, height);
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPosition = process.platform === "darwin" ? y : y - height;
      mainWindow.setBounds({ x: x - width / 2, y, width, height });
      mainWindow.show();
    }
  });

  // Memory Leak
  mainWindow.on("closed", () => (mainWindow = null));
});
